import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-h-avatar',
  templateUrl: './h-avatar.component.html',
  styleUrls: ['./h-avatar.component.scss'],
})
export class HAvatarComponent implements OnInit, AfterViewInit {
  fullName: string = 'Hasib Ullah';
  tagName: string = '';
  colorCode: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.colorCode = '#ffffff';
  }

  ngAfterViewInit(): void {
    let container = this.elementRef.nativeElement.querySelector('.avatar');
    this.renderer.setStyle(container, 'backgroundColor', this.colorCode);
    this.generateNameTag();
    let name = this.elementRef.nativeElement.querySelector('.user-name');
    name.innerHTML = this.tagName;
    // this.renderer.setStyle(name, 'color', this.getContrastYIQ(this.colorCode))
    console.log(this.getTextColor('#000000'));
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateNameTag() {
    if (this.fullName) {
      const arr: string[] = this.fullName.split(' ');

      switch (arr.length) {
        case 0:
          this.tagName = 'N/A';
          break;
        case 1:
          this.tagName = arr[0].length >= 2 ? arr[0].slice(0, 2) : arr[0];
          break;
        case 2:
          this.tagName = arr[0].charAt(0) + arr[1].charAt(0);
          break;
        case 3:
          this.tagName = arr[1].charAt(0) + arr[2].charAt(0);
          break;
        default:
          this.tagName = arr[0].charAt(0) + arr[1].charAt(0);
      }
    } else {
      this.tagName = 'N/A';
    }
  }

  getRGB(c) {
    return parseInt(c, 16) || c;
  }

  getsRGB(c) {
    return this.getRGB(c) / 255 <= 0.03928
      ? this.getRGB(c) / 255 / 12.92
      : Math.pow((this.getRGB(c) / 255 + 0.055) / 1.055, 2.4);
  }

  getLuminance(hexColor) {
    return (
      0.2126 * this.getsRGB(hexColor.substr(1, 2)) +
      0.7152 * this.getsRGB(hexColor.substr(3, 2)) +
      0.0722 * this.getsRGB(hexColor.substr(-2))
    );
  }

  getContrast(f, b) {
    const L1 = this.getLuminance(f);
    const L2 = this.getLuminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  getTextColor(bgColor) {
    const whiteContrast = this.getContrast(bgColor, '#ffffff');
    const blackContrast = this.getContrast(bgColor, '#000000');

    return whiteContrast > blackContrast ? '#ffffff' : '#000000';
  }
}

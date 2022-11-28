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
  @Input('name') fullName: string;
  tagName: string = '';
  colorCode: string;
  colors: string[] = [
    '#00AA55',
    '#009FD4',
    '#B381B3',
    '#939393',
    '#E3BC00',
    '#D47500',
    '#DC2A2A',
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let container = this.elementRef.nativeElement.querySelector('.avatar');
    this.generateNameTag();
    this.colorCode = this.getRandomColor();
    this.renderer.setStyle(container, 'backgroundColor', this.colorCode);
    let name = this.elementRef.nativeElement.querySelector('.user-name');
    name.innerHTML = this.tagName;
    this.renderer.setStyle(name, 'color', '#fff');
  }

  getRandomColor() {
    // let letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;

    return this.colors[this.numberFromText(this.tagName) % this.colors.length];
  }

  numberFromText(text) {
    // numberFromText("AA");
    const charCodes = text
      .split('') // => ["A", "A"]
      .map((char) => char.charCodeAt(0)) // => [65, 65]
      .join(''); // => "6565"
    return parseInt(charCodes, 10);
  }

  generateNameTag() {
    if (this.fullName) {
      const arr: string[] = this.fullName.split(' ');

      switch (arr.length) {
        case 0:
          this.tagName = 'N/A';
          break;
        case 1:
          this.tagName = arr[0].charAt(0);
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

    this.tagName = this.tagName.toUpperCase();
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

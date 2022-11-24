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
  colorCode: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.colorCode = this.getRandomColor();
  }

  ngAfterViewInit(): void {}

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

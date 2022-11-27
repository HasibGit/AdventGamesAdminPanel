import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-navbar-avatar',
  templateUrl: './navbar-avatar.component.html',
  styleUrls: ['./navbar-avatar.component.scss'],
})
export class NavbarAvatarComponent implements OnInit, AfterViewInit {
  @Input('name') fullName: string;
  tagName: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.generateNameTag();
    let name = this.elementRef.nativeElement.querySelector('.user-name');
    name.innerHTML = this.tagName;
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
}

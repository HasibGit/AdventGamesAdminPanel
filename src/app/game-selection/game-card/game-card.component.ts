import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { GameCard } from 'src/app/interfaces/game-card.interface';
import { BreadCrumbLink } from 'src/app/interfaces/breadcrumb.interface';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit, AfterViewInit {
  @Input('gameInfo') game: GameCard;
  gameTitle: string;
  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.gameTitle = this.game.gameTitle;
  }

  ngAfterViewInit(): void {
    this.applyCardStyle();
  }

  applyCardStyle() {
    let element = this.elementRef.nativeElement.querySelector('.game-card');
    this.render.setStyle(
      element,
      'backgroundColor',
      this.game.cardBackgroundColor
    );
  }

  onSelectGame() {
    let breadCrumb: BreadCrumbLink[] = [
      {
        name: 'Games',
        isLink: true,
        routePath: '/',
      },
      {
        name: this.gameTitle,
        isLink: false,
      },
      {
        name: 'Select Analytics',
        isLink: false,
      },
    ];

    this.breadcrumbService.breadcrumb.next(breadCrumb);

    this.router.navigate(['/analytics']);
  }
}

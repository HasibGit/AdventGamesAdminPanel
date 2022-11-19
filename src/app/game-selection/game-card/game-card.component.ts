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
    private router: Router
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
    this.router.navigate([`/analytics/${this.gameTitle}`]);
  }
}

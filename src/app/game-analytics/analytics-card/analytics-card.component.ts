import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { GameAnalytics } from '../../interfaces/game-analytics.interface';

@Component({
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: ['./analytics-card.component.scss'],
})
export class AnalyticsCardComponent implements OnInit, AfterViewInit {
  @Input('analyticsCardInfo') analyticsCardInfo: GameAnalytics;
  analyticsTitle: string;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.analyticsTitle = this.analyticsCardInfo.analyticsTitle;
  }

  ngAfterViewInit(): void {
    this.applyCardStyles();
  }

  applyCardStyles() {
    let element =
      this.elementRef.nativeElement.querySelector('.analytics-card');
    this.renderer.setStyle(
      element,
      'backgroundColor',
      this.analyticsCardInfo.backgroundColor
    );
  }

  onSelectAnalytics() {
    console.log('go to analytics');
  }
}

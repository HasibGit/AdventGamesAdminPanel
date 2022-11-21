import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { GameAnalyticsComponent } from './game-analytics/game-analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/auth.guard';
import { PlayerBaseComponent } from './game-analytics/player-base/player-base.component';
import { AnalyticsGuard } from './shared/analytics.guard';
import { WinnersComponent } from './game-analytics/winners/winners.component';

const routes: Routes = [
  {
    path: '',
    component: GameSelectionComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Select Game',
      breadcrumb: [
        {
          label: 'Games',
          url: '',
        },
      ],
    },
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'analytics/:gameTitle',
    component: GameAnalyticsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Select Analytics',
      breadcrumb: [
        {
          label: 'Games',
          url: '/',
        },
        {
          label: '{{gameTitle}}',
          url: '/analytics/:gameTitle',
        },
        {
          label: 'Select Analytics',
          url: '/analytics/:gameTitle',
        },
      ],
    },
  },
  {
    path: 'analytics/:gameTitle/players',
    component: PlayerBaseComponent,
    canActivate: [AnalyticsGuard],
    data: {
      title: 'PlayerBase',
      breadcrumb: [
        {
          label: 'Games',
          url: '/',
        },
        {
          label: '{{gameTitle}}',
          url: '/analytics/:gameTitle',
        },
        {
          label: 'Players',
          url: 'analytics/:gameTitle/players',
        },
      ],
    },
  },
  {
    path: 'analytics/:gameTitle/winners',
    component: WinnersComponent,
    canActivate: [AnalyticsGuard],
    data: {
      title: 'Winners',
      breadcrumb: [
        {
          label: 'Games',
          url: '/',
        },
        {
          label: '{{gameTitle}}',
          url: '/analytics/:gameTitle',
        },
        {
          label: 'Winners',
          url: 'analytics/:gameTitle/winners',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

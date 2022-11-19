import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { GameAnalyticsComponent } from './game-analytics/game-analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/auth.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

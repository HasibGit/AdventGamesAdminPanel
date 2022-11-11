import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { GameAnalyticsComponent } from './game-analytics/game-analytics.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: GameSelectionComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'analytics',
    component: GameAnalyticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

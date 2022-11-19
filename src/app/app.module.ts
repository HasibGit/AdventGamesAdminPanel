import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { GameAnalyticsComponent } from './game-analytics/game-analytics.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxLoadingModule } from 'ngx-loading';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { GameCardComponent } from './game-selection/game-card/game-card.component';
import { AnalyticsCardComponent } from './game-analytics/analytics-card/analytics-card.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { PlayerBaseComponent } from './game-analytics/player-base/player-base.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSelectionComponent,
    GameAnalyticsComponent,
    AuthComponent,
    NavbarComponent,
    GameCardComponent,
    AnalyticsCardComponent,
    PlayerBaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    NgxLoadingModule.forRoot({}),
    MatMenuModule,
    MatIconModule,
    NgDynamicBreadcrumbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

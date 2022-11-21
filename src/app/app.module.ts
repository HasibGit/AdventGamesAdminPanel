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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GameCardComponent } from './game-selection/game-card/game-card.component';
import { AnalyticsCardComponent } from './game-analytics/analytics-card/analytics-card.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { PlayerBaseComponent } from './game-analytics/player-base/player-base.component';
import { ReusableDatatableComponent } from './shared/components/reusable-datatable/reusable-datatable.component';
import { DatePipe } from '@angular/common';
import { WinnersComponent } from './game-analytics/winners/winners.component';
import { GenerateWinnersModalComponent } from './game-analytics/winners/modals/generate-winners-modal/generate-winners-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

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
    ReusableDatatableComponent,
    WinnersComponent,
    GenerateWinnersModalComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxLoadingModule.forRoot({}),
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    NgDynamicBreadcrumbModule,
  ],
  entryComponents: [GenerateWinnersModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

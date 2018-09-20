import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardDetailComponent } from './components/dashboard-detail/dashboard-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { DashboardRoutingModule } from './dashboard.routing'
import { EffectsModule } from '@ngrx/effects';
// import { DashboardEffects } from './effects/dashboard.effects';
// import { DashboardService } from './services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../shared/pagination/pagination.module'

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
  ],
  declarations: [
    DashboardDetailComponent
  ],
  providers: [
  ],
  exports:[
    DashboardDetailComponent
  ]
})
export class DashboardModule {}
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingDetailComponent } from './components/billing-detail/billing-detail.component';
import { BillingListComponent } from './components/billing-list/billing-list.component';
import { BillingJournalComponent } from './components/billing-journal/billing-journal.component';

import { reducers } from './reducers/index';
//import { billingReducer } from './reducers/billing.reducer';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { BillingRoutingModule } from './billing.routing'
import { EffectsModule } from '@ngrx/effects';
import { BillingEffects } from './effects/billing.effects';
import { BillingService } from './services/billing.service';
import { BillingActivityService } from './services/billing-activity.service';
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
    BillingRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('billings', reducers),
    EffectsModule.forFeature([BillingEffects])
  ],
  declarations: [
    BillingDetailComponent,
    BillingListComponent,
    BillingJournalComponent
  ],
  providers: [
    BillingService, 
    BillingActivityService
  ],
  exports:[
    BillingDetailComponent,
    BillingJournalComponent,
    BillingListComponent
  ]
})
export class BillingModule {}
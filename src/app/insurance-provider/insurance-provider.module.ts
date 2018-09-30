import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceProviderDetailComponent } from './components/insurance-provider-detail/insurance-provider-detail.component';
import { InsuranceProviderListComponent } from './components/insurance-provider-list/insurance-provider-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { InsuranceProviderRoutingModule } from './insurance-provider.routing'
import { EffectsModule } from '@ngrx/effects';
import { InsuranceProviderEffects } from './effects/insurance-provider.effects';
import { InsuranceProviderService } from './services/insurance-provider.service';
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
    InsuranceProviderRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('insuranceProvider', reducers),
    EffectsModule.forFeature([InsuranceProviderEffects])
  ],
  declarations: [
    InsuranceProviderDetailComponent,
    InsuranceProviderListComponent
  ],
  providers: [
    InsuranceProviderService
  ],
  exports:[
    InsuranceProviderDetailComponent,
    InsuranceProviderListComponent
  ]
})
export class InsuranceProviderModule {}
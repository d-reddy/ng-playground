import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClaimsAdjusterDetailComponent } from './components/claims-adjuster-detail/claims-adjuster-detail.component';
import { ClaimsAdjusterListComponent } from './components/claims-adjuster-list/claims-adjuster-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { ClaimsAdjusterRoutingModule } from './claims-adjuster.routing'
import { EffectsModule } from '@ngrx/effects';
import { ClaimsAdjusterEffects } from './effects/claims-adjuster.effects';
import { ClaimsAdjusterService } from './services/claims-adjuster.service';
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
    ClaimsAdjusterRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('claimsAdjuster', reducers),
    EffectsModule.forFeature([ClaimsAdjusterEffects])
  ],
  declarations: [
    ClaimsAdjusterDetailComponent,
    ClaimsAdjusterListComponent
  ],
  providers: [
    ClaimsAdjusterService
  ],
  exports:[
    ClaimsAdjusterDetailComponent,
    ClaimsAdjusterListComponent
  ]
})
export class ClaimsAdjusterModule {}
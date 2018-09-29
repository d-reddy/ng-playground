import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttorneyDetailComponent } from './components/attorney-detail/attorney-detail.component';
import { AttorneyListComponent } from './components/attorney-list/attorney-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { AttorneyRoutingModule } from './attorney.routing'
import { EffectsModule } from '@ngrx/effects';
import { AttorneyEffects } from './effects/attorney.effects';
import { AttorneyService } from './services/attorney.service';
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
    AttorneyRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('attorney', reducers),
    EffectsModule.forFeature([AttorneyEffects])
  ],
  declarations: [
    AttorneyDetailComponent,
    AttorneyListComponent
  ],
  providers: [
    AttorneyService
  ],
  exports:[
    AttorneyDetailComponent,
    AttorneyListComponent
  ]
})
export class AttorneyModule {}
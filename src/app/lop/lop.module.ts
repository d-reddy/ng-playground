import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LopDetailComponent } from './components/lop-detail/lop-detail.component';
import { LopListComponent } from './components/lop-list/lop-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { LopRoutingModule } from './lop.routing'
import { EffectsModule } from '@ngrx/effects';
import { LopEffects } from './effects/lop.effects';
import { LopService } from './services/lop.service';
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
    LopRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('lop', reducers),
    EffectsModule.forFeature([LopEffects])
  ],
  declarations: [
    LopDetailComponent,
    LopListComponent
  ],
  providers: [
    LopService
  ],
  exports:[
    LopDetailComponent,
    LopListComponent
  ]
})
export class LopModule {}
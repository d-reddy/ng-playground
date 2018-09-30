import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LawFirmDetailComponent } from './components/law-firm-detail/law-firm-detail.component';
import { LawFirmListComponent } from './components/law-firm-list/law-firm-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { LawFirmRoutingModule } from './law-firm.routing'
import { EffectsModule } from '@ngrx/effects';
import { LawFirmEffects } from './effects/law-firm.effects';
import { LawFirmService } from './services/law-firm.service';
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
    LawFirmRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('lawFirm', reducers),
    EffectsModule.forFeature([LawFirmEffects])
  ],
  declarations: [
    LawFirmDetailComponent,
    LawFirmListComponent
  ],
  providers: [
    LawFirmService
  ],
  exports:[
    LawFirmDetailComponent,
    LawFirmListComponent
  ]
})
export class LawFirmModule {}
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { doctorReducer } from './reducers/doctor.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { DoctorRoutingModule } from './doctor.routing'
import { EffectsModule } from '@ngrx/effects';
import { DoctorEffects } from './effects/doctor.effects';
import { DoctorService } from './services/doctor.service';
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
    DoctorRoutingModule,
    PaginationModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('doctors', doctorReducer),
    EffectsModule.forFeature([DoctorEffects])
  ],
  declarations: [
    DoctorDetailComponent,
    DoctorListComponent
  ],
  providers: [
    DoctorService
  ],
  exports:[
    DoctorDetailComponent,
    DoctorListComponent
  ]
})
export class DoctorModule {}
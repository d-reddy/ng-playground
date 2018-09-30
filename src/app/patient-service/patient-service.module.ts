import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientServiceDetailComponent } from './components/patient-service-detail/patient-service-detail.component';
import { PatientServiceListComponent } from './components/patient-service-list/patient-service-list.component';
import { reducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { PatientServiceRoutingModule } from './patient-service.routing'
import { EffectsModule } from '@ngrx/effects';
import { PatientServiceEffects } from './effects/patient-service.effects';
import { PatientServiceService } from './services/patient-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { PaginationService } from '../shared/pagination/services/pagination.service';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { ReferenceDataModule } from '../reference-data/reference-data.module';
import { ReferenceDataService } from '../reference-data/services/reference-data.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PatientServiceRoutingModule,
    PaginationModule,
    ReferenceDataModule,
    PatientModule,
    DoctorModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('patientService', reducers),
    EffectsModule.forFeature([PatientServiceEffects]),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  declarations: [
    PatientServiceDetailComponent,
    PatientServiceListComponent
  ],
  providers: [
    PatientServiceService,
    ReferenceDataService,
    PaginationService
  ],
  exports:[
    PatientServiceDetailComponent,
    PatientServiceListComponent
  ]
})
export class PatientServiceModule {}
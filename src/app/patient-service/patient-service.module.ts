import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientServiceDetailComponent } from './components/patient-service-detail/patient-service-detail.component';
import { PatientServiceListComponent } from './components/patient-service-list/patient-service-list.component';
import { patientServiceReducer } from './reducers/patient-service.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { PatientServiceRoutingModule } from './patient-service.routing'
import { EffectsModule } from '@ngrx/effects';
import { PatientServiceEffects } from './effects/patient-service.effects';
import { PatientServiceService } from './services/patient-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { PaginationService } from '../shared/pagination/services/pagination.service';

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
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('patientServices', patientServiceReducer),
    EffectsModule.forFeature([PatientServiceEffects])
  ],
  declarations: [
    PatientServiceDetailComponent,
    PatientServiceListComponent
  ],
  providers: [
    PatientServiceService,
    PaginationService
  ],
  exports:[
    PatientServiceDetailComponent,
    PatientServiceListComponent
  ]
})
export class PatientServiceModule {}
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { patientReducer } from './reducers/patient.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { PatientRoutingModule } from './patient.routing'
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from './effects/patient.effects';
import { PatientService } from './services/patient.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PatientRoutingModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('patients', patientReducer),
    EffectsModule.forFeature([PatientEffects])
  ],
  declarations: [
    PatientDetailComponent,
    PatientListComponent
  ],
  providers: [
    PatientService
  ],
  exports:[
    PatientDetailComponent,
      PatientListComponent
  ]
})
export class PatientModule {}
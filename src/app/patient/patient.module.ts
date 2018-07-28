import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './components/patient.component';
import { PatientGridComponent } from './components/patient-grid.component';
import { patientReducer } from './reducers/patient.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    StoreModule.forFeature('patientFeature', {
        patient: patientReducer
    })
  ],
  declarations: [
    PatientComponent,
    PatientGridComponent
  ],
  providers: [
  ],
  exports:[
      PatientComponent,
      PatientGridComponent
  ]
})
export class PatientModule {}
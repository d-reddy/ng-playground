import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './components/patient.component';
import { patientReducer } from './reducers/patient.reducer'

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    StoreModule.forFeature('patientFeature', {
        patient: patientReducer
    })
  ],
  declarations: [
    PatientComponent
  ],
  providers: [
  ],
  exports:[
      PatientComponent
  ]
})
export class PatientModule {}
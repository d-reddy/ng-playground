import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Patient } from '../../models/patient';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';

import { PatientService } from '../../services/patient.service';

import * as reducer from '../../reducers/patient.reducer';
import * as actions from '../../actions/patient.actions';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  patientForm: FormGroup;
  patient$: Observable<Patient>;
  patientFormSubscription: Subscription;
  
  constructor(private store: Store<reducer.PatientState>, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: PatientService) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.PatientSave(<Patient>{id: value.id, name:value.name, dob:value.dob}));
  }

  ngOnInit() {
    //create the patient form
    this.patientForm = this.fb.group({
      id: '',
      name: '',
      dob: ''
    });

    //fetch the selected patient
    this.patient$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getPatient(+params.get('id')))
    );
    
    //bind changes to the patient to the form input values
    this.patientFormSubscription = this.patient$.subscribe(data => this.patientForm.patchValue(data));
  }

  ngOnDestroy(){
    //unsubscribe on component destroy
    this.patientFormSubscription.unsubscribe();
  }
}
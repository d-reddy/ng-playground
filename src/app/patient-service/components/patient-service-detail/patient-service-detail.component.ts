import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PatientService } from '../../models/patientService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs'

import * as reducer from '../../reducers';
import * as actions from '../../actions/patient-service.actions';

@Component({
  selector: 'app-patient-service',
  templateUrl: './patient-service-detail.component.html',
  styleUrls: ['./patient-service-detail.component.css']
})
export class PatientServiceDetailComponent implements OnInit, OnDestroy {
  patientServiceForm: FormGroup;
  id: number;
  patientService$: Observable<PatientService>;

  patientServiceFormSubscription: Subscription;
  patientServiceSubscription: Subscription;
  
  constructor(private store: Store<reducer.PatientServicesAggregateState>, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.PatientServiceSave(<PatientService>{
      id: value.id, 
      medicalRecordNumber: value.medicalRecordNumber, 
      dateOfService: value.dateOfService, 
      performedExams:  value.exams
    }));
  }

  ngOnInit() {
    //create the patientService form
    this.patientServiceForm = this.fb.group({
      id: '',
      medicalRecordNumber: '',
      dateOfService: '',
      exams: []
    });

    this.patientServiceSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new actions.PatientServiceGet(this.id));
    });
  
    this.patientService$ = this.store.select(reducer.selectCurrentPatientService);
    
    //bind changes to the patient to the form input values
    this.patientServiceFormSubscription = this.patientService$.subscribe(data => {
      if(data) this.patientServiceForm.patchValue(data)
    });
  }

  ngOnDestroy(){
    //unsubscribe on component destroy
    this.patientServiceFormSubscription.unsubscribe();
  }
}
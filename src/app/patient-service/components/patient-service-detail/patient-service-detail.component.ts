import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PatientService } from '../../models/patientService';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import * as reducer from '../../reducers';
import * as actions from '../../actions/patient-service.actions';

@Component({
  selector: 'app-patient-service',
  templateUrl: './patient-service-detail.component.html',
  styleUrls: ['./patient-service-detail.component.css']
})
export class PatientServiceDetailComponent implements OnInit {
  patientServiceForm: FormGroup;
  id: number;
  patientService$: Observable<PatientService>;
 
  constructor(private store: Store<reducer.PatientServicesAggregateState>, private fb: FormBuilder, private route: ActivatedRoute) { }

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

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let patientServiceSlice$ = this.store.select(reducer.selectCurrentPatientService);

    this.patientService$ = patientServiceSlice$.pipe(
      tap(patientService => this.patientServiceForm.patchValue(patientService))
    );

    this.store.dispatch(new actions.PatientServiceGet(this.id));

  }

}
// patient.component.ts
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Patient } from '../models/patient';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as reducer from '../reducers/patient.reducer';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  title:string = 'Patient Form';

  constructor(private store: Store<reducer.PatientState>, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.patientForm = this.fb.group({
      name: [''],
      dob: ['']
   });
  }

  addPatient(name, dob) {
    this.store.dispatch({
      type: 'ADD',
      payload: <Patient> {
        name: name,
        dob: dob
      }
    });
  }

  ngOnInit() {
  }

}
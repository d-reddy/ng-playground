import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Patient } from '../../models/patient';
import { Address } from '../../models/address';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs'
import { switchMap, filter, map } from 'rxjs/operators';

import { PatientService } from '../../services/patient.service';

import * as reducer from '../../reducers';
import * as actions from '../../actions/patient.actions';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  patientForm: FormGroup;
  addressHistory: Address[];
  id: number;
  patient$: Observable<Patient>;

  patientFormSubscription: Subscription;
  patientSubscription: Subscription;
  addressHistorySubscription: Subscription;
  
  constructor(private store: Store<reducer.PatientsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: PatientService) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.PatientSave(<Patient>{
      id: value.id, 
      firstName: value.firstName, 
      middleName: value.middleName, 
      lastName:  value.lastName, 
      phone: value.phone, 
      email: value.email, 
      dob:value.dob,
      notes: value.notes,
      currentAddress: {
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      }
    }));
  }

  ngOnInit() {
    //create the patient form
    this.patientForm = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      phone:'',
      email:'',
      notes:'',
      currentAddress: this.fb.group({
        address:'',
        city:'',
        state:'',
        zip:''
      })
    });

    //fetch the selected patient
    // this.patient$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //   this.service.getPatient(+params.get('id')))
    // );
    this.patientSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new actions.PatientGet(this.id));
    });
  
    this.patient$ = this.store.select(reducer.selectCurrentPatient);
    
    //bind changes to the patient to the form input values
    this.patientFormSubscription = this.patient$.subscribe(data => {
      if(data) this.patientForm.patchValue(data)
    });
    this.addressHistorySubscription = this.patient$.subscribe(data => {
      if(data) this.addressHistory = data.addressHistory
    })
  }

  ngOnDestroy(){
    //unsubscribe on component destroy
    this.patientFormSubscription.unsubscribe();
    this.addressHistorySubscription.unsubscribe();
  }
}
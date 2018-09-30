import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Patient } from '../../models/patient';
import { Address } from '../../models/address';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators';
import * as reducer from '../../reducers';
import * as actions from '../../actions/patient.actions';

@Component({
  selector: 'app-patient',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientForm: FormGroup;
  id: number;
  patient$: Observable<Patient>;
  addressHistory: Address[];
  action: string;
  
  constructor(private store: Store<reducer.PatientsModuleState>, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.initialize();

    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();

  }

  initialize(){
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
      currentAddress: this.fb.group(<Address>{
        address:'',
        city:'',
        state:'',
        zip:''
      })
    });  
  }

  update(){
    
    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let patientSlice$ = this.store.select(reducer.selectCurrentPatient);

    this.patient$ = patientSlice$.pipe(
      tap(patient => {
        this.initialize();
        this.patientForm.patchValue(patient);
        this.addressHistory = patient.addressHistory;
      })
    );

    this.store.dispatch(new actions.PatientGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.patient$ = of(<Patient>{})

  }

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
      currentAddress: <Address>{
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      }
    }));
    
  }
}
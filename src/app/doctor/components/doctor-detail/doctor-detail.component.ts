import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs'

import * as reducer from '../../reducers';
import * as actions from '../../actions/doctor.actions';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit, OnDestroy {
  doctorForm: FormGroup;
  id: number;
  doctor$: Observable<Doctor>;

  doctorFormSubscription: Subscription;
  doctorSubscription: Subscription;
  
  constructor(private store: Store<reducer.DoctorsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.DoctorSave(<Doctor>{
      id: value.id, 
      firstName: value.firstName, 
      middleName: value.middleName, 
      lastName:  value.lastName, 
      phone: value.phone, 
      email: value.email, 
    }));
  }

  ngOnInit() {
    //create the doctor form
    this.doctorForm = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone:'',
      email:'',
    });

    this.doctorSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.store.dispatch(new actions.DoctorGet(this.id));
    });
  
    this.doctor$ = this.store.select(reducer.selectCurrentDoctor);
    
    //bind changes to the patient to the form input values
    this.doctorFormSubscription = this.doctor$.subscribe(data => {
      if(data) this.doctorForm.patchValue(data)
    });
  }

  ngOnDestroy(){
    //unsubscribe on component destroy
    this.doctorFormSubscription.unsubscribe();
  }
}
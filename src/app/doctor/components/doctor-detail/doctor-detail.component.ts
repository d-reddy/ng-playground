import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Doctor } from '../../models/doctor';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'

import * as reducer from '../../reducers';
import * as actions from '../../actions/doctor.actions';
import { map, tap } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit{
  doctorForm: FormGroup;
  id: number;
  doctor$: Observable<Doctor>;
  
  constructor(private store: Store<reducer.DoctorsAggregateState>, private fb: FormBuilder, private route: ActivatedRoute) { }

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

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let doctorSlice$ = this.store.select(reducer.selectCurrentDoctor);

    this.doctor$ = doctorSlice$.pipe(
      tap(doctor => this.doctorForm.patchValue(doctor))
    );

    this.store.dispatch(new actions.DoctorGet(this.id));

  }
}
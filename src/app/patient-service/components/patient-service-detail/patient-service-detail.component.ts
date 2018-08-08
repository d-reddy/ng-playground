import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PatientService } from '../../models/patientService';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'

import * as patientServiceReducer from '../../reducers';

import * as actions from '../../actions/patient-service.actions';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Doctor } from '../../../doctor/models/doctor';

import { Exam } from '../../../reference-data/models/referenceData';
import * as referenceDataReducer from '../../../reference-data/reducers/reference-data.reducer';
import { ReferenceDataGet } from '../../../reference-data/actions/reference-data.actions';

@Component({
  selector: 'app-patient-service',
  templateUrl: './patient-service-detail.component.html',
  styleUrls: ['./patient-service-detail.component.css']
})
export class PatientServiceDetailComponent implements OnInit {
  patientServiceForm: FormGroup;
  examForm: FormGroup;
  id: number;
  patientService$: Observable<PatientService>;
  modalRef: BsModalRef;
  exams$: Observable<Exam[]>;
  doctors: Doctor[];

  constructor(private store: Store<patientServiceReducer.PatientServicesAggregateState>, private refDataStore: Store<referenceDataReducer.ReferenceDataStore>, private fb: FormBuilder, private route: ActivatedRoute,
    private modalService: BsModalService) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.PatientServiceSave(<PatientService>{
      id: value.id, 
      medicalRecordNumber: value.medicalRecordNumber, 
      dateOfService: value.dateOfService, 
      performedExams:  value.exams
    }));
  }

  
  onSubmitExam({ value, valid }) {
    alert(this.exams$[value.examId-1]);
  }

  ngOnInit() {

    //this.exams = [ {id:1, name:'brain mri'}, {id:2, name: 'chest mri'}, {id:3, name:'face mri'}];
    this.doctors = [{id:1, firstName:'tim', lastName:'doctor'}, {id:2, firstName:'jawartolo', lastName:'melancholoy'}];

    //move to guard at some point?:  https://toddmotto.com/preloading-ngrx-store-route-guards
    this.exams$ = this.refDataStore.select('referenceData').pipe(
      map(data => data.exams)
    );

    this.refDataStore.dispatch(new ReferenceDataGet());
    
    //create the patientService form
    this.patientServiceForm = this.fb.group({
      id: '',
      medicalRecordNumber: '',
      dateOfService: '',
      exams: []
    });

    this.examForm = this.fb.group({
      examId: null,
      doctorId: null
    });

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let patientServiceSlice$ = this.store.select(patientServiceReducer.selectCurrentPatientService);

    this.patientService$ = patientServiceSlice$.pipe(
      tap(patientService => this.patientServiceForm.patchValue(patientService))
    );

    this.store.dispatch(new actions.PatientServiceGet(this.id));

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
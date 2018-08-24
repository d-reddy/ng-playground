import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';
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
import {PerformedExam} from '../../models/performedExam';

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

  displayedExams: PerformedExam[];

  constructor(private store: Store<patientServiceReducer.PatientServicesAggregateState>, private refDataStore: Store<referenceDataReducer.ReferenceDataStore>, private fb: FormBuilder, private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {

    this.doctors = [{id:1, firstName:'tim', lastName:'doctor'}, {id:2, firstName:'jawartolo', lastName:'melancholoy'}];

    //move to guard at some point?  https://toddmotto.com/preloading-ngrx-store-route-guards
    this.exams$ = this.refDataStore.select('referenceData').pipe(
      map(data => data.exams)
    );

    this.refDataStore.dispatch(new ReferenceDataGet());
    
    this.id = +this.route.snapshot.paramMap.get('id');
  
    let patientServiceSlice$ = this.store.select(patientServiceReducer.selectCurrentPatientService);

    this.patientService$ = patientServiceSlice$.pipe(
      tap(patientService => {
        this.initialize();
        this.patientServiceForm.patchValue(patientService);
        patientService.performedExams.forEach(pe => {
          this.displayedExams.push(pe);
          this.performedExams.push(this.fb.group(pe))
        });
      })
    );

    this.store.dispatch(new actions.PatientServiceGet(this.id));
  }

  initialize(){

    this.displayedExams = [];

    this.patientServiceForm = this.fb.group({
      id: '',
      medicalRecordNumber: '',
      dateOfService: '',
      performedExams: this.fb.array([])
    });

    this.examForm = this.fb.group({
      examId: null,
      doctorId: null
    });

  }

  getDoctorName(id: number) {
    let doctor = this.doctors.filter(doc => doc.id == id);
    return doctor[0].firstName;
  }

  getExamName(id: number) {
   return this.exams$.pipe(
    map(exams => {
     let exam = exams.filter(e => e.id == id);
     return (exam.length > 0) ? exam[0].name : null;
   }));
  }

  onSubmit({ value, valid }) {
    console.warn(this.patientServiceForm.value);
    console.warn(this.patientServiceForm.dirty);

    this.store.dispatch(new actions.PatientServiceSave(<PatientService>{
      id: value.id, 
      medicalRecordNumber: value.medicalRecordNumber, 
      dateOfService: value.dateOfService, 
      performedExams: value.performedExams
    }));
  }

  deleteExam(doctorId: number, examId: number){
    this.displayedExams = this.displayedExams.filter(pe => !(pe.doctorId == doctorId && pe.examId == examId));
    this.patientServiceForm.setControl('performedExams', this.fb.array(this.displayedExams || []));
    this.patientServiceForm.markAsDirty();
  }

  get performedExams(){
    return this.patientServiceForm.get('performedExams') as FormArray;
  }

  //exam modal interactions
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmitExam({ value, valid }) {
    //check if already added
    let matchingExams = this.patientServiceForm.get("performedExams").value.filter(pe => pe.doctorId == value.doctorId && pe.examId == value.examId);

    if (matchingExams.length == 0){
      let performedExam = <PerformedExam>{doctorId:value.doctorId,examId:value.examId,patientServiceId:this.id};
      this.displayedExams.push(performedExam)
      this.patientServiceForm.get("performedExams").value.push(performedExam);
      this.patientServiceForm.markAsDirty();
    }
  }
}
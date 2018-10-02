import { FormGroup, FormArray, FormBuilder,  Validators } from '@angular/forms';
import { PatientService } from '../../models/patientService';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs'
import { tap, map, takeUntil } from 'rxjs/operators'
import * as patientServiceReducer from '../../reducers';
import * as actions from '../../actions/patient-service.actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Doctor } from '../../../doctor/models/doctor';
import { Exam } from '../../../reference-data/models/referenceData';
import * as referenceDataReducer from '../../../reference-data/reducers/reference-data.reducer';
import { ReferenceDataGet } from '../../../reference-data/actions/reference-data.actions';
import {PerformedExam} from '../../models/performedExam';
import { ToastrService } from 'ngx-toastr';
import {FormCanDeactivate} from '../../../shared/form/form-can-deactivate';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-patient-service',
  templateUrl: './patient-service-detail.component.html',
  styleUrls: ['./patient-service-detail.component.css']
})
export class PatientServiceDetailComponent extends FormCanDeactivate implements OnInit, OnDestroy {

  form: FormGroup;
  examForm: FormGroup;
  id: number;
  patientService$: Observable<PatientService>;
  modalRef: BsModalRef;
  exams$: Observable<Exam[]>;
  doctors: Doctor[];
  action: string;

  displayedExams: PerformedExam[];
  destroyed$ = new Subject<boolean>();

  constructor(private store: Store<patientServiceReducer.PatientServiceModuleState>, private refDataStore: Store<referenceDataReducer.ReferenceDataStore>, private fb: FormBuilder, private route: ActivatedRoute,
    private modalService: BsModalService, private toastr: ToastrService, private actions$: Actions) {
      super();
     }

  ngOnInit() {

    this.initialize();

    this.doctors = [{id:1, firstName:'tim', lastName:'doctor'}, {id:2, firstName:'jawartolo', lastName:'melancholoy'}];

    this.exams$ = this.refDataStore.select('referenceData').pipe(
      map(data => data.exams)
    );

    //https://stackoverflow.com/questions/43226681/how-to-subscribe-to-action-success-callback-using-ngrx-and-effects
    this.actions$.pipe(
      ofType(actions.PatientServiceActionTypes.PATIENTSERVICE_SAVE_COMPLETE),
      takeUntil(this.destroyed$),
      tap(() => { 
        this.toastr.success('Saved');
      })).subscribe();
      
    this.refDataStore.dispatch(new ReferenceDataGet());

    let mode = this.route.snapshot.queryParamMap.get('mode');

    mode == 'update' ? this.update() : this.create();
  }

  initialize(){

    this.displayedExams = [];

    this.form = this.fb.group({
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

  update(){
    
    this.action = 'Update';

    this.id = +this.route.snapshot.paramMap.get('id');
  
    let patientServiceSlice$ = this.store.select(patientServiceReducer.selectCurrentPatientService);

    this.patientService$ = patientServiceSlice$.pipe(
      tap(patientService => {
        this.initialize();
        this.form.patchValue(patientService);
        patientService.performedExams.forEach(pe => {
          this.displayedExams.push(pe);
          this.performedExams.push(this.fb.group(pe))
        });
      })
    );

    this.store.dispatch(new actions.PatientServiceGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    this.patientService$ = of(<PatientService>{})

  }

  onSubmit({ value, valid }) {
    console.warn(this.form.value);
    console.warn(this.form.dirty);

    this.store.dispatch(new actions.PatientServiceSave(<PatientService>{
      id: value.id, 
      medicalRecordNumber: value.medicalRecordNumber, 
      dateOfService: value.dateOfService, 
      performedExams: value.performedExams
    }));

    //NOT CORRECT, NEEDS TO BE ACTION DRIVEN
    //this.showSuccess();
  }

  onSubmitExam({ value, valid }) {
    //check if already added
    let matchingExams = this.form.get("performedExams").value.filter(pe => pe.doctorId == value.doctorId && pe.examId == value.examId);

    if (matchingExams.length == 0){
      let performedExam = <PerformedExam>{doctorId:value.doctorId,examId:value.examId,patientServiceId:this.id};
      this.displayedExams.push(performedExam)
      this.form.get("performedExams").value.push(performedExam);
      this.form.markAsDirty();
    }
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

  deleteExam(doctorId: number, examId: number){
    this.displayedExams = this.displayedExams.filter(pe => !(pe.doctorId == doctorId && pe.examId == examId));
    this.form.setControl('performedExams', this.fb.array(this.displayedExams || []));
    this.form.markAsDirty();
  }

  get performedExams(){
    return this.form.get('performedExams') as FormArray;
  }

  //exam modal interactions
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
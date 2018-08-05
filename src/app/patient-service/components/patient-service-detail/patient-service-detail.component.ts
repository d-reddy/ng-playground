import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PatientService } from '../../models/patientService';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import * as reducer from '../../reducers';
import * as actions from '../../actions/patient-service.actions';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Exam } from '../../models/exam';

@Component({
  selector: 'app-patient-service',
  templateUrl: './patient-service-detail.component.html',
  styleUrls: ['./patient-service-detail.component.css']
})
export class PatientServiceDetailComponent implements OnInit {
  patientServiceForm: FormGroup;
  id: number;
  patientService$: Observable<PatientService>;
  modalRef: BsModalRef;
  exams: Exam[];

  constructor(private store: Store<reducer.PatientServicesAggregateState>, private fb: FormBuilder, private route: ActivatedRoute,
    private modalService: BsModalService) { }

  onSubmit({ value, valid }) {
    this.store.dispatch(new actions.PatientServiceSave(<PatientService>{
      id: value.id, 
      medicalRecordNumber: value.medicalRecordNumber, 
      dateOfService: value.dateOfService, 
      performedExams:  value.exams
    }));
  }

  ngOnInit() {

    this.exams = [ {id:1, name:'brain mri'}, {id:2, name: 'chest mri'}, {id:3, name:'face mri'}];

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


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
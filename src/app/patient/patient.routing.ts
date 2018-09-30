import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientListComponent } from './components/patient-list/patient-list.component'

const routes: Routes =[
    { path: 'patients',          component: PatientListComponent },
    { path: 'patients/:id',      component: PatientDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PatientRoutingModule { }

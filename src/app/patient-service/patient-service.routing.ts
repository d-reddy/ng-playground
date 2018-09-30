import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PatientServiceDetailComponent } from './components/patient-service-detail/patient-service-detail.component';
import { PatientServiceListComponent } from './components/patient-service-list/patient-service-list.component'
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard';
import { AuthGuard } from '../shared/guards/auth-guard';

const routes: Routes =[
    { path: 'patient/services',          component: PatientServiceListComponent },
    { path: 'patient/services/:id',       component: PatientServiceDetailComponent, canDeactivate: [CanDeactivateGuard], canActivate:[AuthGuard] }
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
export class PatientServiceRoutingModule { }

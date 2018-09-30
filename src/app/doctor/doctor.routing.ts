import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component'

const routes: Routes =[
    { path: 'doctors',          component: DoctorListComponent },
    { path: 'doctors/:id',       component: DoctorDetailComponent }
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
export class DoctorRoutingModule { }

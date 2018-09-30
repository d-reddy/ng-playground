import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AttorneyDetailComponent } from './components/attorney-detail/attorney-detail.component';
import { AttorneyListComponent } from './components/attorney-list/attorney-list.component'

const routes: Routes =[
    { path: 'attorneys',          component: AttorneyListComponent },
    { path: 'attorneys/:id',      component: AttorneyDetailComponent }
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
export class AttorneyRoutingModule { }

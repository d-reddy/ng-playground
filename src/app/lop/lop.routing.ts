import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LopDetailComponent } from './components/lop-detail/lop-detail.component';
import { LopListComponent } from './components/lop-list/lop-list.component'

const routes: Routes =[
    { path: 'lops',          component: LopListComponent },
    { path: 'lops/:id',      component: LopDetailComponent }
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
export class LopRoutingModule { }

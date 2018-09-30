import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LawFirmDetailComponent } from './components/law-firm-detail/law-firm-detail.component';
import { LawFirmListComponent } from './components/law-firm-list/law-firm-list.component'

const routes: Routes =[
    { path: 'lawfirms',          component: LawFirmListComponent },
    { path: 'lawfirms/:id',      component: LawFirmDetailComponent }
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
export class LawFirmRoutingModule { }

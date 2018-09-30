import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsAdjusterDetailComponent } from './components/claims-adjuster-detail/claims-adjuster-detail.component';
import { ClaimsAdjusterListComponent } from './components/claims-adjuster-list/claims-adjuster-list.component'

const routes: Routes =[
    { path: 'claimsadjusters',          component: ClaimsAdjusterListComponent },
    { path: 'claimsadjusters/:id',      component: ClaimsAdjusterDetailComponent }
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
export class ClaimsAdjusterRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { BillingDetailComponent } from './components/billing-detail/billing-detail.component';
import { BillingJournalComponent } from './components/billing-journal/billing-journal.component';
import { BillingListComponent } from './components/billing-list/billing-list.component'

const routes: Routes =[
    { path: 'billings',          component: BillingListComponent },
    { path: 'billings/:id',      component: BillingDetailComponent },
    { path: 'billings/journal/:id',      component: BillingJournalComponent },
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
export class BillingRoutingModule { }

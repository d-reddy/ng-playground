import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceProviderDetailComponent } from './components/insurance-provider-detail/insurance-provider-detail.component';
import { InsuranceProviderListComponent } from './components/insurance-provider-list/insurance-provider-list.component'

const routes: Routes =[
    { path: 'insuranceproviders',          component: InsuranceProviderListComponent },
    { path: 'insuranceproviders/:id',      component: InsuranceProviderDetailComponent }
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
export class InsuranceProviderRoutingModule { }

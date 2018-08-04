import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [   
    { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: 'doctors', title: 'Doctors',  icon: 'pe-7s-id', class: '' },
    { path: 'patients', title: 'Patients',  icon: 'pe-7s-user', class: '' },
    { path: 'patient/services', title: 'Patient Services',  icon: 'pe-7s-bandaid', class: '' },   
];

export const BILLING_ROUTES: RouteInfo[] = [   
    { path: 'insuranceproviders', title: 'Insurance Providers',  icon: '', class: '' },
    { path: 'claimsadjusters', title: 'Claims Adjusters',  icon: '', class: '' },
    { path: 'lawfirms', title: 'Law Firms',  icon: '', class: '' },
    { path: 'attorneys', title: 'Attorneys',  icon: '', class: '' },
    { path: 'patients', title: 'Patients',  icon: '', class: '' },
    { path: 'billings', title: 'Billings',  icon: '', class: '' },
    { path: 'casemanagement', title: 'LOP Case Management',  icon: '', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  billingMenuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.billingMenuItems = BILLING_ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

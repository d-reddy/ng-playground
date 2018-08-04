import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/home.component';
// import { UserComponent } from './user/user.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component'
// import { TablesComponent } from './tables/tables.component';
// import { TypographyComponent } from './typography/typography.component';
// import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';

const routes: Routes =[
    // { path: 'dashboard',      component: HomeComponent },
    // { path: 'user',           component: UserComponent },
    { path: 'doctors',          component: DoctorListComponent },
    { path: 'doctors/:id',       component: DoctorDetailComponent },
    // { path: 'table',          component: TablesComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class DoctorRoutingModule { }
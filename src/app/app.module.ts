import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppRoutingModule } from './app.routing';

import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { PatientModule } from './patient/patient.module'
import { DoctorModule } from './doctor/doctor.module'
import { PatientServiceModule } from './patient-service/patient-service.module'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PaginationModule } from './shared/pagination/pagination.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.forRoot([]),    
    PatientModule,
    DoctorModule,
    PatientServiceModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    PaginationModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,    
    StoreModule.forRoot({}),
    //https://medium.com/stratajet-tech/a-beginners-guide-to-ngrx-store-bc2184d6d7f0
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
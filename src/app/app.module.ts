import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { PaginationModule } from './shared/pagination/pagination.module';
import { ReferenceDataModule } from './reference-data/reference-data.module'
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientServiceModule } from './patient-service/patient-service.module';
import { InsuranceProviderModule } from './insurance-provider/insurance-provider.module';
import { LawFirmModule } from './law-firm/law-firm.module';
import { ClaimsAdjusterModule } from './claims-adjuster/claims-adjuster.module';
import { AttorneyModule } from './attorney/attorney.module';
import { BillingModule } from './billing/billing.module';
import { LopModule } from './lop/lop.module';
import { DashboardModule} from './dashboard/dashboard.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModalModule } from 'ngx-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard';
import { AuthGuard } from './shared/guards/auth-guard'

import { AuthenticationService } from './shared/authentication/services/auth.service'
import { CallbackComponent } from './shared/authentication/components/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    EffectsModule.forRoot([]),    
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,    
    StoreModule.forRoot({}),
    //https://medium.com/stratajet-tech/a-beginners-guide-to-ngrx-store-bc2184d6d7f0
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    ModalModule.forRoot(),
    PaginationModule,
    ReferenceDataModule,
    PatientModule,
    DoctorModule,
    PatientServiceModule,
    InsuranceProviderModule,
    LawFirmModule,
    ClaimsAdjusterModule,
    AttorneyModule,
    BillingModule,
    LopModule,
    DashboardModule,

    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [AuthenticationService, CanDeactivateGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
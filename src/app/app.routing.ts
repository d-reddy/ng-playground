import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent} from './shared/authentication/components/callback.component'
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes =[
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'callback',  component: CallbackComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,
      //{ enableTracing: true }       // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: ``,
  styles: []
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.handleLoginCallback(this.route);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router, ActivatedRoute, Params} from '@angular/router';
 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,  private router: Router) { }
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    handleLoginCallback(route: ActivatedRoute){
        
        let token = route.snapshot.queryParams["token"];
        let returnRoute = route.snapshot.queryParams["returnRoute"];

        localStorage.setItem('currentUser', token);

        this.router.navigate([returnRoute]);
    }
}
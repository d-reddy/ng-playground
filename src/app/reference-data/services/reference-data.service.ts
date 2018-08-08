import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReferenceData } from '../models/referenceData';

@Injectable()
export class ReferenceDataService {
  //this is just a hack for testing
  private API_PATH = 'referenceData';

  constructor(private http: HttpClient) {}

  getReferenceData(): Observable<ReferenceData> {
    //execute some api call to fetch referenceData

    //just mocking out an observable response
    return of(<ReferenceData>{
      exams: [{id: 1, name:'brain mri'},{id:2, name: 'chest mri'}],
      insuranceProviderTypes: [{id: 1, name:'auto'}, {id: 2, name: 'health'}]
    });
  }

}

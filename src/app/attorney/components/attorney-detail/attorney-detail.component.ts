import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Attorney } from '../../models/attorney';
import { Address } from '../../models/address';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import * as reducer from '../../reducers';
import * as actions from '../../actions/attorney.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attorney',
  templateUrl: './attorney-detail.component.html',
  styleUrls: ['./attorney-detail.component.css']
})
export class AttorneyDetailComponent implements OnInit, OnDestroy {
  attorneyForm: FormGroup;
  id: number;
  attorney$: Observable<Attorney>;
  action: string;
  destroyed$ = new Subject<boolean>();

  constructor(private store: Store<reducer.AttorneyModuleState>, private fb: FormBuilder, private route: ActivatedRoute, 
    private toastr: ToastrService, private actions$: Actions) { }

  ngOnInit() {

    //initialize form
    this.initialize();

     //https://stackoverflow.com/questions/43226681/how-to-subscribe-to-action-success-callback-using-ngrx-and-effects
     this.actions$.pipe(
      ofType(actions.AttorneyActionTypes.ATTORNEY_SAVE_COMPLETE),
      takeUntil(this.destroyed$),
      tap(() => { 
        this.toastr.success('Saved');
      })).subscribe();

    //determine which mode this page is being called in... create or update?
    let mode = this.route.snapshot.queryParamMap.get('mode');

    //handle mode
    mode == 'update' ? this.update() : this.create();

  }

  initialize(){
  
    //create the attorney form
    this.attorneyForm = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      fax: '',
      email:'',
      notes:'',
      currentAddress: this.fb.group(<Address>{
        address:'',
        city:'',
        state:'',
        zip:''
      })
    });
  
  }

  update(){

    this.action = 'Update';

    //fetch the id of the attorney from the route
    this.id = +this.route.snapshot.paramMap.get('id');

    //select a piece of the store to start listenting to, specifically
    //... the selected attorney.
    let attorneySlice$ = this.store.select(reducer.selectCurrentAttorney);

    //create a listenter for modifications to that slice of the store
    //... in other words create a subscription for when the selectCurrentAttorney
    //... changes.
    this.attorney$ = attorneySlice$.pipe(
      tap(attorney => {
        //before applying form values, clean form
        this.initialize();
        //when the selected attorney is updated, take the payload, and
        //... patch the form (apply on top of the instantiated form object)
        this.attorneyForm.patchValue(attorney);
      })
    );

    //dispatch an event to fetch the attorney selected, this call,
    //... will eventually result in the selectedCurrentAttorney getted updated
    //... in the store, which will then cause the listener subscribing above to
    //... get called, and then it will patch the new attorney on top of the form
    //... which will then update the view, which listens for changes to the form.
    this.store.dispatch(new actions.AttorneyGet(this.id));

  }

  create(){
    
    this.action = 'Create';

    //just create an empty form.
    this.attorney$ = of(<Attorney>{})

  }

  onSubmit({ value, valid }) {

    //dispatch an attorney save event, passing the values from the form.
    this.store.dispatch(new actions.AttorneySave(<Attorney>{
      id: value.id, 
      firstName: value.firstName, 
      middleName: value.middleName, 
      lastName:  value.lastName, 
      phone: value.phone, 
      fax: value.fax, 
      email: value.email, 
      notes: value.notes,
      currentAddress: <Address>{
        address: value.currentAddress.address,
        city: value.currentAddress.city,
        state: value.currentAddress.state,
        zip: value.currentAddress.zip
      },
      lawFirmId: value.lawFirmId
    }));
    
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
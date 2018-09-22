import { Injectable } from '@angular/core';
import {BillingJournal} from '../models/billingJournal';

@Injectable()
export class BillingActivityService {
    billingActivity: BillingJournal;
}
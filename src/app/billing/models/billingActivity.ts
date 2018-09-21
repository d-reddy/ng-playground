import { ContactActivity } from './contactActivity';
import { PaymentActivity } from './paymentActivity';
import { NegotiationActivity } from './negotiationActivity';

export interface BillingActivity {
    id: number;
    billedItemId: number; //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
    billedItemTypeId: number; //individual exam vs a group of exams for an lop
    dateBilled: Date;
    amount: number;
    balance: number;
    billedEntityId: number; //patientId, insuranceProviderId, lawfirmId, attorneyId
    billedEntityTypeId: number; //patient, insurance provider, law firm, attorney
    statusId: number; //open, settled, collections, etc
    
    contactActivity: ContactActivity[];
    paymentActivity: PaymentActivity[];
    negotiationActivity: NegotiationActivity[];
}
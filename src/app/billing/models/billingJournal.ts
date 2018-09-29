import { ContactActivity } from './contactActivity';
import { PaymentActivity } from './paymentActivity';
import { NegotiationActivity } from './negotiationActivity';
import { Attachment } from './attachment';

export interface BillingJournal {
    id: number;

    ledgerId: number;       //examBillingId or lopCaseId since an LOP Case can be associated with multiple exams
    ledgerTypeId: number;   //individual exam vs a bill tied to a lop which could be for a group of exams

    dateBilled: Date;
    amount: number;
    balance: number;
    statusId: number;           //open, settled, collections, etc

    billedEntityId: number;     //patientId, insuranceProviderId, lawfirmId, attorneyId
    billedEntityTypeId: number; //patient, insurance provider, law firm, attorney
    billedEntityName: string;

    contactActivities: ContactActivity[];
    paymentActivities: PaymentActivity[];
    negotiationActivities: NegotiationActivity[];

    attachments: Attachment[];
}
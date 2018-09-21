import { BillingActivity } from './billingActivity'

export interface ExamBilling {
    id: number;
    patientServiceId: number;
    patientName: string;
    patientId: number;
    doctorName: string;
    doctorId: number;
    examId: number;
    exam: string;
    dateOfService: Date;
    statusId: number; //status representing if the exam payment has been completed... open/complete.
    amount: number;

    patientBillingActivities: BillingActivity[];
    insuranceBillingActivities: BillingActivity[];
    //an individual exam can be bundled as part of an LOP, because of that not tracking BillingActivity
    // ... at the LOP level, in an individual exam billing, so only holding a reference to the lopCaseId
    //is this item associated with an LOP Case?
    lopCaseId: number;
  }
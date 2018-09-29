export interface PaymentActivity {
    id: number;
    billingJournalId: number;
    datePaid: Date;
    amount: number;
}
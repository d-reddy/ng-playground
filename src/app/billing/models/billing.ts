export interface Billing {
  id: number;
  patientName: string;
  patientId: number;
  doctorName: string;
  doctorId: number;
  exam : string;
  dateOfService: Date;
  statusId: number;
  amount: number;
}
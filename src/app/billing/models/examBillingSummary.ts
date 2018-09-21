export interface ExamBillingSummary {
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
}
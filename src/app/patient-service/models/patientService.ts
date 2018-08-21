import { PerformedExam } from './performedExam'

export interface PatientService {
  id: number;
  medicalRecordNumber: number;  //this is the patientId
  performedExams: PerformedExam[],
  dateOfService: Date
}
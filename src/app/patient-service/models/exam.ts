export interface Exam {
  id: number;
  name: string;
}

export interface PerformedExam {
  patientServiceId: number;
  examId: number;
  doctorId: number;
  notes: string;
}
export interface Exam {
  id: number;
  name: string;
}

export interface InsuranceProviderType {
  id: number;
  name: string;
}

export interface ReferenceData {
  exams: Exam[];
  insuranceProviderTypes : InsuranceProviderType[];
}
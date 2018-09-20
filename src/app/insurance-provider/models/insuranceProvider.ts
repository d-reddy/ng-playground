import { Address } from './address'

export interface InsuranceProvider {
  id: number;
  name: string;
  phone: string;
  fax: string;
  email: string;
  notes: string;
  currentAddress: Address;
}
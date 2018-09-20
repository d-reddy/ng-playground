import { Address } from './address'

export interface LawFirm {
  id: number;
  name: string;
  phone: string;
  fax: string;
  email: string;
  notes: string;
  currentAddress: Address;
}
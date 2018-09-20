import { Address } from './address'

export interface Lop {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  notes: string;
  currentAddress: Address;
  lawFirmId: number;
}
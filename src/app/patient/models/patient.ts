import { Address } from './address'

export interface Patient {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  notes: string;
  currentAddress: Address;
  addressHistory: Address[];
}
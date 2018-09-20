import { Address } from './address'

export interface ClaimsAdjuster {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  notes: string;
  currentAddress: Address;
  //can a claims adjuster work for multiple insurance providers?
  insuranceProviderIds: number[];
}
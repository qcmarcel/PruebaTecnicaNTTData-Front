import {Injectable} from '@angular/core';
import default_customer from './customer.json';
import {ApiService} from './api.service';

export interface Customer {
  name: string,
  lastname: string,
  company?: string,
  person_type?: string,
  identity_number: number | string,
  identity_type: string,
  email?: string,
  phone_number: string | number,
  country_code?: string,
  address: string,
  state?: string,
  city: string,
  postal_code?: string
}

export const DEFAULT_CUSTOMER: Customer = {
  name: default_customer.name ?? '',
  lastname: default_customer.lastname ?? '',
  identity_number: default_customer.identity_number ?? '',
  identity_type: default_customer.identity_type ?? '',
  phone_number: default_customer.phone ?? '',
  address: default_customer.address ?? '',
  city: default_customer.city ?? ''
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customer: Customer | any = DEFAULT_CUSTOMER;
  customerKeyRename = {};

  constructor(private apiService: ApiService) {
  }

  private readonly API_ROUTE = "customer";

  private readonly DEFAULT_DOCUMENT_TYPE = "C";

  onLoadCustomer({number: documentNumber = 0, type: documentType = this.DEFAULT_DOCUMENT_TYPE}) {
    this.apiService.suffix = [documentType, documentNumber];
    return this.apiService.get(this.API_ROUTE);
  }

  get customer(): any {
    return this._customer;
  }

  set customer(value: any) {
    Object.entries(this.customerKeyRename).forEach(([key, rename]) => {
      if (rename && typeof rename === 'string') {
        this._customer[rename] = value[key];
        /*delete this._customer[key];*/
      }
    });
    this._customer = value;
  }
}

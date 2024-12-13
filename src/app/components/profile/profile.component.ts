import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Customer, CustomerService, DEFAULT_CUSTOMER} from '../../services/customer.service';
import {NgClass} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {isKeyOf} from '../../helpers/app.helpers';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: Customer = DEFAULT_CUSTOMER;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) {
    this.loadFromService()
  }

  loadFromService() {
    this.activatedRoute.params.subscribe(params => {
        if (params) {
          this.customerService.onLoadCustomer({...params})?.subscribe((customer_response: any) => {
              try {
                if (isKeyOf(customer_response, 'body')) {
                  if (!customer_response.body) {
                    console.debug('customer_response body not found:', customer_response);
                    return;
                  }
                  const {body}: any = customer_response;
                  if (body
                    && isKeyOf(body, 'data')
                    && body.hasOwnProperty('data')) {
                    const {data}: any = body;
                    this.customerService.customer = data ?? body;
                  } else {
                    this.customerService.customer = body;
                    console.debug('customer_response.body', body);
                  }
                  this.user = this.customerService.customer;
                }
              } catch (customer_response_e) {
                console.warn("Error onLoadCustomer itemObserver:", customer_response_e)
              }
            }
          );
        }
      }
    )
    ;
  }

}

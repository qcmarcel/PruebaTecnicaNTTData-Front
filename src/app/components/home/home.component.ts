import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  get document_number(): number {
    return this._document_number;
  }

  set document_number(value: number|string) {
    if (typeof value === 'string') {
      value = parseInt(value.replace(/\D/g, ''));
    }
    if (value) this._document_number = value;
  }

  get document_type(): String {
    return this._document_type;
  }

  set document_type(value: String) {
    this._document_type = value;
  }

  private _document_type: String = "";
  private _document_number: number = 0;
  document_types: any = [
    'Cédula de ciudadanía', 'Pasaporte',
  ];
  documentNumberPattern: /*string | */RegExp = /^[0-9]{8,11}$/;

  private readonly separator: string = '.';

  formatNumber(event: any) {
    this.document_number = event.target.value;
    event.target.value = this.document_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
  }
  check() {
    return this.document_type && this.document_number && this.documentNumberPattern.test(this.document_number.toString());
  }

  onSubmit() {
    if (this.check()) {
      this.router.navigate(['/profile', this.document_type.charAt(0), this.document_number]);/*.then(r => console.debug('Form submitted'));*/
    } else {
      console.debug('Form not submitted');
    }
  }
}

import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  get document_number(): number {
    return this._document_number;
  }

  set document_number(value: number) {
    this._document_number = value;
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

  submit() {

  }

  check() {
    return this.document_type && this.document_number && this.documentNumberPattern.test(this.document_number.toString());
  }
}

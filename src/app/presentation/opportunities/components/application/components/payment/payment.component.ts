import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Property } from '../../../../../../data/property/property';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Input() property!: Property;
  @Input() formGroup!: FormGroup;

}

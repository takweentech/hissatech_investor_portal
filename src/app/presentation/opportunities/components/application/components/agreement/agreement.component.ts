import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Property } from '../../../../../../data/property/property';

@Component({
  selector: 'app-agreement',
  imports: [],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss'
})
export class AgreementComponent {
  @Input() formGroup!: FormGroup;
  @Input() property!: Property;

}

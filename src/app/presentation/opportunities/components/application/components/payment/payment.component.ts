import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Property } from '../../../../../../data/property/property';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  imports: [TranslatePipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Input() property!: Property;
  @Input() formGroup!: FormGroup;
  private readonly lookupService = inject(LookupService);
  bankInfo = this.lookupService.getBankInfo();
  constructor() {
  }

}

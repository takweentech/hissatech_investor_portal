import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvestData } from '../../../../../../data/investment/investment';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../../../../../data/property/property';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-amount',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss'
})
export class AmountComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  @Input() formGroup!: FormGroup;
  @Input() property!: Property;
  investment: InvestData = this.activatedRoute.snapshot.data['investment']?.data;

}

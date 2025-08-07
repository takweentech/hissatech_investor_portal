import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-amount',
  imports: [ReactiveFormsModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss'
})
export class AmountComponent {
  @Input() formGroup!: FormGroup;
}

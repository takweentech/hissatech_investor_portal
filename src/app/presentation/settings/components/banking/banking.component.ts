import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../../core/services/token.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-banking',
  imports: [ReactiveFormsModule],
  templateUrl: './banking.component.html',
  styleUrl: './banking.component.scss'
})
export class BankingComponent {
  public traslationService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    bankName: [this.tokenService.getUser().bankName],
    iban: [this.tokenService.getUser().iban],
    name: [this.tokenService.getUser().name],
  });
}

import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { TokenService } from '../../../../core/services/token.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  public traslationService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    newEmail: [this.tokenService.getUser().email],
    phoneNumber: [this.tokenService.getUser().phone],
  });
}

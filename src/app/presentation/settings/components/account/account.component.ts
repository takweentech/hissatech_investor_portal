import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { TokenService } from '../../../../core/services/token.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { AccountService } from '../../../../data/account/account.service';
import { finalize, forkJoin, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../core/base/base.component';
import { OtpComponent } from '../../../../shared/components/otp/otp.component';

enum Mode {
  OTP = 'otp',
  FORM = 'form',
}

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, TranslatePipe, CommonModule, OtpComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent {
  public transaltionService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly accountService = inject(AccountService);
  loading = signal<boolean>(false);
  modes = Mode;
  mode: Mode = Mode.FORM;
  tempToken!: string;
  form: FormGroup = this.fb.group({
    newEmail: [this.tokenService.getUser().email],
    phoneNumber: [this.tokenService.getUser().phone],
  });


  onSave(): void {
    this.loading.set(true);
    this.accountService.sendOtpPhoneEmail(this.form.value.email, this.form.value.phone).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status === 202) {
          this.mode = this.modes.OTP;
          this.tempToken = response.data.token;
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' })
        }
      },
      error: (error) => {
        this.toastService.show({ text: error.message, classname: 'bg-danger text-light' })
      }
    })

  }

  onSubmit(otp: number | string): void {
    const dto: any = {
      phoneNumber: this.form.value.phoneNumber,
      newEmail: this.form.value.newEmail,
      otp: otp,
    }
    forkJoin([this.accountService.updatePhone(dto, this.tempToken), this.accountService.updateEmail(dto, this.tempToken)]).pipe(takeUntil(this.destroy$)).subscribe({
      next: ([response1, response2]) => {
        if ((response1.status === 200 || response1.status === 202) && (response2.status === 200 || response2.status === 202)) {
          this.mode = this.modes.FORM;
          this.toastService.show({ text: "Changes were successfully changed", classname: 'bg-success text-light' })
        } else {
          this.toastService.show({ text: response1.message || response2.message, classname: 'bg-danger text-light' })
        }
      },
      error: (error) => {
        this.toastService.show({ text: error.message, classname: 'bg-danger text-light' })
      }
    })
  }

}

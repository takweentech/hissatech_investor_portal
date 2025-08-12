import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TokenService } from '../../../../core/services/token.service';
import { AuthService } from '../../../../core/services/auth.service';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { finalize, Subscription, takeUntil, timer } from 'rxjs';
import { CONFIG } from '../../../../core/constants/config.constants';
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputComponent, ReactiveFormsModule],
  templateUrl: './otp.component.html'
})
export class OtpComponent extends BaseComponent implements OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  @Input() token!: string;
  @Output() resendOtp = new EventEmitter<void>();

  otp: FormControl<string | number | null> = new FormControl(null);
  loading = signal<boolean>(false);
  otpCountdown = signal<number>(0);
  private otpCountdown$!: Subscription;

  ngOnInit(): void {
    this.initOtpCountDown()
    this.otp.valueChanges.pipe(finalize(() => finalize(() => this.loading.set(false))), takeUntil(this.destroy$)).subscribe({
      next: (val) => {
        if (val?.toString().length === 4) {
          this.authService.checkOtpLogin(val, this.token).subscribe({
            next: (response) => {
              if (response.status == 200) {
                // Set token
                this.tokenService.setToken(response.data?.token);
                this.tokenService.setUser(response.data?.profileInfo);
                this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT]);
              } else {
                this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
              }
            }
          })
        }
      }
    })
  }

  onResendOtp(): void {
    this.resendOtp.emit();
    this.initOtpCountDown();
  }

  initOtpCountDown(): void {
    this.otpCountdown.set(CONFIG.OTP_INTERVAL);
    this.otpCountdown$ = timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (val == CONFIG.OTP_INTERVAL) {
          this.otpCountdown.set(0);
          this.otpCountdown$.unsubscribe();
        } else {
          this.otpCountdown.set(this.otpCountdown() - 1);
        }
      });
  }
}

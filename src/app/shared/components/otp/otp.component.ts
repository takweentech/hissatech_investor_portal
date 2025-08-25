import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

import { finalize, Subscription, takeUntil, timer } from 'rxjs';
import { BaseComponent } from '../../../core/base/base.component';
import { CONFIG } from '../../../core/constants/config.constants';
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputComponent, ReactiveFormsModule],
  templateUrl: './otp.component.html'
})
export class OtpComponent extends BaseComponent implements OnInit {
  @Input() token!: string;
  @Output() resendOtp = new EventEmitter<void>();
  @Output() otpCompleted = new EventEmitter<string | number>();

  otp: FormControl<string | number | null> = new FormControl(null);
  loading = signal<boolean>(false);
  otpCountdown = signal<number>(0);
  private otpCountdown$!: Subscription;

  ngOnInit(): void {
    this.initOtpCountDown()
    this.otp.valueChanges.pipe(finalize(() => finalize(() => this.loading.set(false))), takeUntil(this.destroy$)).subscribe({
      next: (val) => {
        if (val?.toString().length === 4) {
          this.otpCompleted.emit(val);
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

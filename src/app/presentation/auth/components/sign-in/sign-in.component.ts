import { Component, inject, OnInit, signal } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpComponent } from '../../../../shared/components/otp/otp.component';
import { TokenService } from '../../../../core/services/token.service';

enum Modes {
  FORM = 'form',
  OTP = 'otp'
}

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe, OtpComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  public traslationService = inject(TranslationService);
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  loading = signal<boolean>(false);
  modes = Modes;
  mode: Modes = Modes.FORM;


  ROUTES = WEB_ROUTES;
  signInForm!: FormGroup;
  tempToken!: string;


  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signInForm = this.fb.group({
      userName: [null, [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      password: [null, Validators.required],
      rememberMe: false
    })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.loading.set(true)
      this.authService.validateSignIn({ ...this.signInForm.value, userName: this.signInForm.value.userName }).pipe(
        finalize(() => this.loading.set(false))
      ).subscribe({
        next: (response) => {
          if (response.status === 200) {
            // this.openOtp(response.data?.token);
            this.mode = this.modes.OTP;
            this.tempToken = response.data?.token
          } else {
            this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
          }
        },
        error: (err) => {
          this.toastService.show({ text: err.message, classname: 'bg-danger text-light' });
        }
      })
    } else {
      this.signInForm.markAllAsTouched()
    }
  }

  onLogin(otp: string | number): void {
    this.authService.checkOtpLogin(otp, this.tempToken).subscribe({
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

import { Component, inject, OnInit, signal } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  public traslationService = inject(TranslationService);
  loading = signal<boolean>(false);
  private fb = inject(FormBuilder);

  private modalService = inject(NgbModal);


  ROUTES = WEB_ROUTES;
  signInForm!: FormGroup;


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
            this.openOtp(response.data?.token);
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


  openOtp(token: string | undefined) {
    const modalRef = this.modalService.open(OtpComponent, { centered: true });
    modalRef.componentInstance.token = token;
  }
}

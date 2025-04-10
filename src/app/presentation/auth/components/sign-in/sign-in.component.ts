import { Component, inject, OnInit, signal } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  private toastService = inject(ToastService);
  loading = signal<boolean>(false);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ROUTES = WEB_ROUTES;
  signInForm!: FormGroup;


  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signInForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, Validators.required],
      rememberMe: false
    })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.loading.set(true)
      this.authService.signIn(this.signInForm.value).pipe(
        finalize(() => this.loading.set(false))
      ).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastService.show({ text: 'Successfully logged in', classname: 'bg-primary text-light' });
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
}

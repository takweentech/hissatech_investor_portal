import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TokenService } from '../../../../core/services/token.service';
import { AuthService } from '../../../../core/services/auth.service';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { ToastService } from '../../../../shared/components/toast/toast.service';
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputComponent, ReactiveFormsModule],
  templateUrl: './otp.component.html'
})
export class OtpComponent implements OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private ngbActiveModal = inject(NgbActiveModal);
  private toastService = inject(ToastService);
  @Input() token!: string;
  otp: FormControl<string | number | null> = new FormControl(null);

  ngOnInit(): void {
    this.otp.valueChanges.subscribe({
      next: (val) => {
        if (val?.toString().length === 4) {
          this.authService.checkOtpLogin(val, this.token).subscribe({
            next: (response) => {
              if (response.status == 200) {
                // Set token
                this.tokenService.setToken(response.data?.token);
                this.tokenService.setUser(response.data?.profileInfo);
                this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT]);
                this.ngbActiveModal.close();
              } else {
                this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
              }
            }
          })
        }
      }
    })
  }

  onClose() {
    this.ngbActiveModal.close();
  }

}

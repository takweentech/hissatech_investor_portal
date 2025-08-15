import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AblyService } from '../../../../core/services/ably.service';
import { InvestorSignUp } from '../../../../core/models/investor.model';
import { LookupService } from '../../../../core/services/lookup.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { TokenService } from '../../../../core/services/token.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements AfterViewInit, OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private ablyService = inject(AblyService);
  private lookupService = inject(LookupService);
  public traslationService = inject(TranslationService);
  PRIMARY_INCOME_SOURCES = this.lookupService.getIncomeSources();
  PRIMARY_INCOME_AMOUNTS = this.lookupService.getIncomeAmounts();
  private fb = inject(FormBuilder);

  ROUTES = WEB_ROUTES;
  signUpForm!: FormGroup;
  loading = signal<boolean>(false);
  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;

  private stepperInstance!: Stepper;


  initForm() {
    this.signUpForm = this.fb.group({
      step_1: this.fb.group({
        idNumber: ['1532626785', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^(1|2)[0-9]{9}$'),]],
      }),
      step_2: this.fb.group({
        fullName: [''],
        email: ['', Validators.required, Validators.email],
        phoneNumber: ['', [Validators.pattern(/^5\d{8}$/), Validators.required]],
        sourceIncome: [null, Validators.required],
        incomeAmount: [null, Validators.required]
      }),
      step_3: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      })
    }) as FormGroup;
  }


  get form() {
    return this.signUpForm.controls;
  }


  onNext(step: number) {
    const stepControl = this.signUpForm.controls['step_' + step]
    if (stepControl.valid) {
      // Handle step one submission
      if (step == 1) {
        this.loading.set(true);
        this.authService.nafathRequest(stepControl.value.idNumber).subscribe({
          next: (response: any) => {
            if (response.status !== 200) {
              this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
              this.loading.set(false)
              return
            };
            // Integrate Ably once Nafath integration is approved
            this.loading.set(true);
            this.authService.nafathCallback(response?.data?.transId).pipe(
              finalize(() => this.loading.set(false))
            ).subscribe({
              next: (nafathData) => {
                const fullNameControl = (this.signUpForm.controls['step_' + 2] as FormGroup).controls['fullName'];
                fullNameControl.setValue(`${nafathData.data?.englishFirstName} ${nafathData.data?.englishLastName}`)
                fullNameControl.disable();
                this.stepperInstance.next();
              },
              error: (err) => {
              }
            })
          }
        })
      }
      // Handle step two submission
      if (step == 2) {
        this.stepperInstance.next();
      }
      // Handle step three submission
      if (step == 3) {
        this.loading.set(true)
        this.finishRegistration();
      }
    } else {
      stepControl.markAllAsTouched();
    }
  }

  finishRegistration() {
    const investor: InvestorSignUp = {
      ...this.signUpForm.controls['step_' + 1].value,
      ...this.signUpForm.controls['step_' + 2].value,
      ...this.signUpForm.controls['step_' + 3].value,
    }

    investor.phoneNumber = '966' + investor.phoneNumber
    this.authService.signupInvestor(investor).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.tokenService.setToken(response.data?.token);
          this.tokenService.setUser(response.data?.profileInfo);
          this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT])
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' })
        }
      },
      error: () => {

      }
    })
  }

  ngOnInit(): void {
    this.initForm();
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stepperRef && !this.stepperInstance) {
        this.stepperInstance = new Stepper(this.stepperRef.nativeElement, {
          linear: false,
          animation: true,
        });
      }
    });
  }


}

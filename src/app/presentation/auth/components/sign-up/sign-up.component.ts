import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import Stepper from 'bs-stepper';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface RegistrationForm {
  idNumber: FormControl<number>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  sourceIncome: FormControl<number>;
  incomeAmount: FormControl<number>;
}

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements AfterViewInit, OnInit {

  private fb = inject(FormBuilder);
  ROUTES = WEB_ROUTES;
  signUpForm!: FormGroup;

  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;

  private stepperInstance!: Stepper;


  initForm() {
    this.signUpForm = this.fb.group({
      step_1: this.fb.group({
        idNumber: ['',],
      }),
      step_2: this.fb.group({
        email: ['',],
        phoneNumber: ['',],
        password: ['',],
        confirmPassword: ['',],
      }),
      step_3: this.fb.group({
        sourceIncome: [0,],
        incomeAmount: [0,]
      })
    }) as FormGroup;
  }


  get form() {
    return this.signUpForm.controls;
  }


  onNext(step: number) {
    if (this.signUpForm.controls['step_' + step].valid) {
      this.stepperInstance.next();
    } else {
      this.signUpForm.controls['step_' + step].markAllAsTouched();
    }
  }

  onFinishRegistration() {

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

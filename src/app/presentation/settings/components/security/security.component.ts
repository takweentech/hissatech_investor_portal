import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AccountService } from '../../../../data/account/account.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-security',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent extends BaseComponent implements OnInit {
  loading = signal<boolean>(false);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly accountService = inject(AccountService);

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  onSave(): void {
    this.loading.set(true);
    this.accountService.updatePassword(this.form.value).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status === 202) {
          this.toastService.show({ text: "Password was successfully updated", classname: 'bg-success text-light' });
          this.form.reset()
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' })
        }
      },
      error: (error) => {
        this.toastService.show({ text: error.message, classname: 'bg-danger text-light' })
      }
    })

  }

}

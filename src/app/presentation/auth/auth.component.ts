import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandingComponent } from "./components/branding/branding.component";
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, BrandingComponent],
  template: `<div class="vh-100 mx-auto row">
  <div class="d-none d-lg-block col-12 col-lg-5 p-0">
      <app-branding></app-branding>
  </div>
  <div class="col-12 col-lg-7 p-0 position-relative">
    <a href="javascript:void(0)" (click)="onLangChange()" class="text-decoration-none cursor-pointer text-primary position-absolute lang-link">
    <i class="fa-solid fa-globe"></i>
      {{translationService.language === 'en' ? 'Arabic' : 'English'}}
    </a>
      <router-outlet />
  </div>
</div>`
})
export class AuthComponent {
  translationService = inject(TranslationService);
  onLangChange(): void {
    this.translationService.onLangChange();
  }
}

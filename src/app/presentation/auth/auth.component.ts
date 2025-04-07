import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandingComponent } from "./components/branding/branding.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, BrandingComponent],
  template: `<div class="vh-100 mx-auto row">
  <div class="d-none d-lg-block col-12 col-lg-5 p-0">
      <app-branding></app-branding>
  </div>
  <div class="col-12 col-lg-7 p-0 position-relative">
    <a href="" class="text-primary position-absolute lang-link">
      Arabic
    </a>
      <router-outlet />
  </div>
</div>`
})
export class AuthComponent {

}

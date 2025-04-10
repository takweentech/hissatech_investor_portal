import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment.prod';
import { ToastComponent } from "./shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  template: `<router-outlet />  <app-toast/>`
})
export class AppComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  title = 'hissatech_investor_portal';



  ngOnInit(): void {
    this.translationService.init(environment.defaultLang);
  }
}

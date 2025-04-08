import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class AppComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  title = 'hissatech_investor_portal';



  ngOnInit(): void {
    this.translationService.init(environment.defaultLang);
  }
}

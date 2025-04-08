import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLanguage!: string;
  public language!: string;
  public languageKey = 'preferredLanguage';

  constructor(private translateService: TranslateService) {
  }


  /**
  * Initializes i18n for the application.
  * Loads language from local storage if present, or sets default language.
  * @param defaultLanguage The default language to use.
  * @param supportedLanguages The list of supported languages.
  */
  init(defaultLanguage: string) {
    this.defaultLanguage = defaultLanguage;
    this.language = localStorage.getItem(this.languageKey) || defaultLanguage;
    this.translateService.use(this.language);
    let dir = this.language == 'ar' ? 'rtl' : 'ltr';
    document.querySelector('html')?.setAttribute('dir', dir);
    localStorage.setItem(this.languageKey, this.language);
  }


  onLangChange(lang?: string) {
    localStorage.setItem(this.languageKey, lang ? lang : this.language == 'ar' ? 'en' : 'ar')
    location.reload();
  }

}

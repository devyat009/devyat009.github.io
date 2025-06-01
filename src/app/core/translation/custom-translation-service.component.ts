import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient, private page: string) {}


  getTranslation(lang: string): Observable<any> {
    // Dynamically load translations based on the page
    return this.http.get(`./assets/i18n/${this.page}/${lang}.json`);
  }
}

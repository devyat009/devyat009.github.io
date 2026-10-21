import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class MultiFileTranslateLoader implements TranslateLoader {
  private readonly modules: string[] = [
    'home',
    'about',
    'projects',
    'contact',
    'nav-bar',
    'not-found',
    'redirect',
    'under-maintence',
  ];

  constructor(
    private http: HttpClient,
    private prefix: string = './assets/i18n/'
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const normalizedLang = lang.toLowerCase();

    // Carrega o arquivo raiz (se existir) + todas as subpastas em paralelo
    const requests: Observable<any>[] = [
      this.http.get(`${this.prefix}${normalizedLang}.json`).pipe(catchError(() => of({}))),
      ...this.modules.map((mod) =>
        this.http.get(`${this.prefix}${mod}/${normalizedLang}.json`).pipe(catchError(() => of({})))
      ),
    ];

    return forkJoin(requests).pipe(
      map((translations) => {
        return translations.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      })
    );
  }
}

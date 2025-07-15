import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storageService.service';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedTranslationService {
  private isServer: boolean;
  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isServer = isPlatformServer(platformId);
  }
  /**
   * Change language the entire application
   * @param language - The language to be loaded
   * @param page - The page path
   */
  changeLanguage(language: string, page: string, setStorage?: boolean): void {
    this.translate.use(language);
    this.loadPageTranslations(language, page);
    this.storageService.set('language', language);
  }

  changeLanguageByUrl(language: string): void {
    const page = this.getCurrentPage();
    if (page == undefined)
    {
      console.warn('Warning: Translation page is undefined:', page);
    }
    if (page) {
      this.changeLanguage(language, page, true);
    } else {
      //console.error('No page found in the URL to change language.');
      this.changeLanguage(language, 'home', true);
    }
  }
  getCurrentPage(): string {
    if (typeof window === 'undefined') return 'home'; // fallback for SSR
  const cleanUrl = this.router.url.split('?')[0].split('#')[0];
  const segments = cleanUrl.split('/').filter(Boolean);
  return segments[0];
  }

  /**
   * Initializes the translation service with the default language
   * @param defaultLanguage - The default language to be set
   */
  initializeTranslations() {
    const language = this.storageService.get('language')  || 'pt-br';
    this.changeLanguage(language, 'nav-bar', false);
    this.changeLanguageByUrl(language);
    console.log('Initialized language:',language);
  }

  /**
   * Loads the translations for a specific page
   * @param language - The language to be loaded
   * @param page - The page path
   */
  loadPageTranslations(language: string, page: string): void {
    if (this.isServer) {
      return;
    }
    const normalizedLanguage = language.toLowerCase();
    console.log(normalizedLanguage);

    // First will try load local translation
    this.loadLocalTranslation(normalizedLanguage, page).subscribe({
      next: (translations) => {
        if (translations) {
          this.translate.setTranslation(normalizedLanguage, translations, true);
        } else {
          this.loadHttpTranslation(normalizedLanguage, page);
        }
      },
      error: (err) => {
        this.loadHttpTranslation(normalizedLanguage, page);
      }
    });
  }

  /**
   * Loads the translations with HttpClient
   * @param language - The language to be loaded
   * @param page - The page path
   * @returns Observable with the loaded translations or null
   */
  private loadLocalTranslation(language: string, page: string): Observable<any> {
    const path = `./assets/i18n/${page}/${language}.json`;

    return this.http.get(path).pipe(
      catchError((err) => {
        return of(null);
      })
    );
  }

  /**
   * Load HTTP translations or Locally
   * @param language - The language to be loaded
   * @param page - The page path
   */
  private loadHttpTranslation(language: string, page: string): void {
    const loader = new TranslateHttpLoader(this.http, `./assets/i18n/${page}/`, `.json`);
    loader.getTranslation(language).subscribe({
      next: (translations) => {
        this.translate.setTranslation(language, translations, true);
      },
      error: (err) => {
        //console.error(`Error to load HTTP translation for ${page}/${language}:`, err);
        this.changeLanguage(language, 'not-found');
      },
    });
  }
}

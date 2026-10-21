import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storageService.service';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedTranslationService {
  private readonly isServer: boolean;
  private readonly defaultLang = 'pt-br';

  constructor(
    private readonly translate: TranslateService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  /**
   * Inicializa o serviço de tradução configurando o idioma padrão
   * e ativando o idioma salvo no storage (ou 'pt-br').
   */
  initializeTranslations(): Observable<any> {
    const savedLang = (this.storageService.get('language') || this.defaultLang).toLowerCase();
    this.translate.setDefaultLang(this.defaultLang);
    return this.translate.use(savedLang);
  }

  /**
   * Altera o idioma globalmente e persiste a preferência no StorageService.
   */
  changeLanguage(language: string, _page?: string, _setStorage: boolean = true): Observable<any> {
    const normalized = (language || this.defaultLang).toLowerCase();
    if (_setStorage) {
      this.storageService.set('language', normalized);
    }
    return this.translate.use(normalized);
  }

  changeLanguageByUrl(language: string): void {
    this.changeLanguage(language);
  }

  getCurrentPage(): string {
    if (typeof window === 'undefined') return 'home';
    const cleanUrl = this.router?.url ? this.router.url.split('?')[0].split('#')[0] : '';
    const segments = cleanUrl.split('/').filter(Boolean);
    return segments[0] || 'home';
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.storageService.get('language') || this.defaultLang;
  }

  /**
   * Mantido para compatibilidade histórica.
   * O MultiFileTranslateLoader já unifica e carrega todos os módulos de tradução.
   */
  loadPageTranslations(_language: string, _page: string): void {
    // Todas as traduções das páginas já são carregadas pelo MultiFileTranslateLoader.
  }
}

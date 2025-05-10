import { DOCUMENT } from "@angular/common";
import { Injectable, Inject, RendererFactory2, Renderer2 } from "@angular/core";
import { StorageService } from "./storageService.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initializeTheme() {
    const savedTheme = this.storageService.get('theme');
    if (savedTheme === 'theme-light' || savedTheme === 'theme-dark') {
      this.setTheme(savedTheme, false);
    } else {
      this.setTheme('theme-light', false);
    }
  }

  setTheme(theme: 'theme-light' | 'theme-dark', saveToStorage: boolean = true) {
    if (this.currentTheme === theme) return;

    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      // Atualiza o arquivo CSS do tema
      this.renderer.setAttribute(themeLink, 'href', `assets/themes/${theme}.css`);

      // Atualiza classes no body para estilos adicionais
      this.renderer.removeClass(this.document.body, this.currentTheme);
      this.renderer.addClass(this.document.body, theme);

      this.currentTheme = theme;
      console.log('new theme:', this.currentTheme);

      if (saveToStorage) {
        this.storageService.set('theme', theme);
      }
    }
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}

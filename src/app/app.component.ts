import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterModule } from '@angular/router';
import { ThemeService } from './shared/services/theming.service';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { StorageService } from './shared/services/storageService.service';
import { SharedTranslationService } from './core/translation/shared-translation-service.component';
import { AppLoadingComponent } from './shared/components/app-loading/app-loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    NavBarComponent,
    AppLoadingComponent,
    CommonModule
  ],
})
export class AppComponent {
  title = 'my-page';
  loading: boolean = false;

  constructor(
    private themeService: ThemeService,
    private storageService: StorageService,
    private translationService: SharedTranslationService,
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.loading = true;
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.themeService.initializeTheme();
    this.translationService.initializeTranslations();
    this.loading = false;
  }
  setTheme(theme: 'theme-light' | 'theme-dark', saveToStorage: boolean = true) {
    this.themeService.setTheme(theme, false);
  }

  switchLanguage(language: string): void {
    this.translationService.changeLanguageByUrl(language);
    this.translationService.changeLanguage(language, 'nav-bar');
    this.translationService.changeLanguage(language, 'not-found');
  }
}

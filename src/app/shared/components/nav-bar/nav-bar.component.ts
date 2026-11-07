import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../services/theming.service';
import { StorageService } from '../../services/storageService.service';
import { SharedTranslationService } from 'src/app/core/translation/shared-translation-service.component';

@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive
  ],
})
export class NavBarComponent {
  @Output() switchLang = new EventEmitter<string>();

  theme: boolean = false; // false = light, true = dark
  currentLang: string = '';

  animateIcon: boolean = false;
  showMobileMenu: boolean = false;

  constructor(
    private _themeService: ThemeService,
    private _storageService: StorageService,
    private readonly _translate: TranslateService,
    private readonly _translationService: SharedTranslationService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _elementRef: ElementRef
  ) {}

  ngOnInit() {
    this._storageService.get('theme') === 'theme-dark' ? this.theme = true : this.theme = false;
    this.currentLang = this._storageService.get('language') ?? 'pt-br';
  }

  changeTheme(theme: boolean) {
    this.theme = theme;
    this._themeService.setTheme(theme ? 'theme-dark' : 'theme-light');
  }

  onSwitchLanguage(language: string) {
    this.currentLang = language;
    this.switchLang.emit(language);
  }

  navigateTo(route: string): void {
    this._router.navigate([route]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showMobileMenu && !this._elementRef.nativeElement.contains(event.target)) {
      this.showMobileMenu = false;
    }
  }
}

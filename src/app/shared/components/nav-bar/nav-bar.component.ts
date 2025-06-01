import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../services/theming.service';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { StorageService } from '../../services/storageService.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedTranslationService } from 'src/app/core/translation/shared-translation-service.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    ButtonModule,
    CommonModule,
    MenubarModule,
    ToolbarModule,
    ToggleButtonModule,
    TranslateModule,
    RouterLink,
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
    this._themeService.setTheme(theme? 'theme-dark' : 'theme-light');
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

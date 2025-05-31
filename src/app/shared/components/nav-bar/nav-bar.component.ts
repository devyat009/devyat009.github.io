import { Component, Renderer2 } from '@angular/core';
import { Button } from 'primeng/button';
import { ThemeService } from '../../services/theming.service';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenuItem } from 'primeng/api';
import { StorageService } from '../../services/storageService.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    Button,
    CommonModule,
    MenubarModule,
    ToolbarModule,
    ToggleButtonModule
  ],
})
export class NavBarComponent {
  theme: boolean = false; // false = light, true = dark
  animateIcon: boolean = false;

  constructor(
    private _themeService: ThemeService,
    private _storageService: StorageService,
  ) {}

  ngOnInit() {
    console.log('started navbar');
    this._storageService.get('theme') === 'theme-dark' ? this.theme = true : this.theme = false;
  }

  changeTheme(theme: boolean) {
    this.theme = theme;
    this._themeService.setTheme(theme? 'theme-dark' : 'theme-light');
  }
}

import { Component, Renderer2 } from '@angular/core';
import { Button } from 'primeng/button';
import { ThemeService } from '../../services/theming.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    Button,
    CommonModule

  ],
})
export class NavBarComponent {
  theme: boolean = false; // false = light, true = dark
  constructor(
    private _themeService: ThemeService
  ) {}

  ngOnInit() {
    console.log('started navbar');
  }

  changeTheme(theme: boolean) {
    this.theme = theme;
    this._themeService.setTheme(theme? 'theme-dark' : 'theme-light');
  }
}

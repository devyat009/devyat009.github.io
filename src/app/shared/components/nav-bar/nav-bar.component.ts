import { Component, Renderer2 } from '@angular/core';
import { Button } from 'primeng/button';
import { ThemeService } from '../../services/theming.service';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [
    Button,
    CommonModule,
    MenubarModule,

  ],
})
export class NavBarComponent {
  theme: boolean = false; // false = light, true = dark

  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Sobre', icon: 'pi pi-user', routerLink: '/about' },
    { label: 'Contato', icon: 'pi pi-envelope', routerLink: '/contact' }
  ];
  
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

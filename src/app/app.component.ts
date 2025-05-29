import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theming.service';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { StorageService } from './shared/services/storageService.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-page';


  constructor(
    private themeService: ThemeService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    console.log('started app');
    this.themeService.initializeTheme();
    // const savedTheme = this.storageService.get('theme');
    // if (savedTheme) {
    //   console.log('Found saved theme:', savedTheme);
    //   this.setTheme(savedTheme as 'theme-light' | 'theme-dark');
    // } else {
    //   console.log('No saved theme found, using default (light)');
    //   this.setTheme('theme-light');
    // }
  }
  setTheme(theme: 'theme-light' | 'theme-dark', saveToStorage: boolean = true) {
    this.themeService.setTheme(theme, false);
  }
}

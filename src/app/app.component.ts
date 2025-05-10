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
    const theme = this.storageService.get('theme');
    if(theme) {
      console.log('theme found, setting theme...', theme);
      this.themeService.switchTheme(theme);
    }
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
}

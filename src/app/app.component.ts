import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theming.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-page';


  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    console.log('started app');
  }

  changeTheme(theme: string) {
    console.log('changing theme 1: ', theme);
    this.themeService.switchTheme(theme);
  }
}

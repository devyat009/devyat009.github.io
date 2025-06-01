import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    TranslateModule,
    RouterLink
  ]
})
export class HomeComponent {


  ngOnInit() {
  }
}

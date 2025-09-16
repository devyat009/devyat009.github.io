import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from "src/app/shared/components/footer/footer.component";

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    TranslateModule,
    RouterLink,
    FooterComponent
]
})
export class HomeComponent {


  ngOnInit() {
  }
}

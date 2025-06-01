import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [
    TranslateModule,
  ]
})
export class AboutComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

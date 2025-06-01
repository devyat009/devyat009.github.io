import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'contact-page',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [
    TranslateModule,
  ]
})
export class ContactComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

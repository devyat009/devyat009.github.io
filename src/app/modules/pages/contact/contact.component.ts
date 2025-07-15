import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { UnderMaintenceComponent } from "src/app/shared/components/under-maintence/under-maintence.component";

@Component({
  selector: 'contact-page',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [
    TranslateModule,
    UnderMaintenceComponent
]
})
export class ContactComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

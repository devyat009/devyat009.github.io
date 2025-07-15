import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { UnderMaintenceComponent } from "src/app/shared/components/under-maintence/under-maintence.component";

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [
    TranslateModule,
    UnderMaintenceComponent
]
})
export class AboutComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

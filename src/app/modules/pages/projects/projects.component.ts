import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [
    TranslateModule,
    FooterComponent
]
})
export class ProjectsComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

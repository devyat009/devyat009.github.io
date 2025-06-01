import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [
    TranslateModule,
  ]
})
export class ProjectsComponent {
  constructor() {}

  ngOnInit() {
    // Any initialization logic can go here
  }
}

import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { StarsComponent } from "src/app/shared/components/stars/stars.component";
import { ImageModalService } from "src/app/shared/services/image-modal.service";

@Component({
  selector: 'projects-page',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [
    TranslateModule,
    FooterComponent,
    StarsComponent
  ]
})
export class ProjectsComponent {
  constructor(private imageModalService: ImageModalService) {}

  openImage(src: string, alt?: string, caption?: string, title?: string) {
    this.imageModalService.open({ src, alt, caption, title });
  }

  ngOnInit() {
    // Any initialization logic can go here
  }
}

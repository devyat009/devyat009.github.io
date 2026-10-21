import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { StarsComponent } from "src/app/shared/components/stars/stars.component";
import { ImageModalService } from "src/app/shared/services/image-modal.service";

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    TranslateModule,
    RouterLink,
    FooterComponent,
    StarsComponent
  ]
})
export class HomeComponent {
  constructor(private imageModalService: ImageModalService) {}

  openImage(src: string, alt?: string, caption?: string, title?: string) {
    this.imageModalService.open({ src, alt, caption, title });
  }

  ngOnInit() {
  }
}

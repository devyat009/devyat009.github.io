import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SharedTranslationService } from 'src/app/core/translation/shared-translation-service.component';
import { StorageService } from 'src/app/shared/services/storageService.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    TranslateModule,
    CommonModule,
    ButtonModule,
    RouterLink
  ],
})
export class NotFoundComponent {
    stars = Array.from({ length: 60 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 2 + 1.5,
  }));

  constructor(
    private translate: SharedTranslationService,
    private readonly _storageService: StorageService
  ) {
    const lang = _storageService.get('language') || 'pt-br';
    this.translate.loadPageTranslations(lang, 'not-found');
  }

  transform = 'translate(0px, 0px)';

  onMouseMove(event: MouseEvent) {
    const el = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - el.left) / el.width - 0.5) * 20;
    const y = ((event.clientY - el.top) / el.height - 0.5) * 20;
    this.transform = `translate(${x}px, ${y}px)`;
  }

  resetMove() {
    this.transform = 'translate(0px, 0px)';
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { RouterLink } from '@angular/router';
import { SharedTranslationService } from 'src/app/core/translation/shared-translation-service.component';
import { StorageService } from 'src/app/shared/services/storageService.service';
import { StarsComponent } from 'src/app/shared/components/stars/stars.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslateModule,
    RouterLink,
    StarsComponent
],
})
export class NotFoundComponent {
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

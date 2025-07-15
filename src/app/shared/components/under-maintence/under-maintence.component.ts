import { TranslateModule } from "@ngx-translate/core";
import { Component } from "@angular/core";
import { CommonModule} from "@angular/common";
import { SharedTranslationService } from "src/app/core/translation/shared-translation-service.component";
import { StorageService } from "src/app/shared/services/storageService.service";


@Component({
  selector: 'under-maintence',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './under-maintence.component.html',
  styleUrls: ['./under-maintence.component.scss']
})
export class UnderMaintenceComponent {
  stars = Array.from({ length: 60 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 2 + 1.5,
  }));

  transform = 'translate(0px, 0px)';

  constructor(
    private translate: SharedTranslationService,
    private readonly _storageService: StorageService
  ) {
    // Load translations for this component
    const lang = _storageService.get('language') || 'pt-br';
    this.translate.loadPageTranslations(lang, 'under-maintence');
  }

  // Paralax effect
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

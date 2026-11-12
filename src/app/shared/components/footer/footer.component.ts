import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateModule, RouterLink],
})
export class FooterComponent {
  readonly currentYear: number = new Date().getFullYear();
  readonly isOpenToWork: boolean = Boolean(environment.openToWork);

  constructor() {}
}

import { TranslateModule } from "@ngx-translate/core";
import { Component, ChangeDetectionStrategy } from "@angular/core";



@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './app-loading.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent {}

import { TranslateModule } from "@ngx-translate/core";
import { Component } from "@angular/core";
import { CommonModule} from "@angular/common";


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent {}

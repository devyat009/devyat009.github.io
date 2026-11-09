import { TranslateModule } from "@ngx-translate/core";
import { Component } from "@angular/core";



@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent {}

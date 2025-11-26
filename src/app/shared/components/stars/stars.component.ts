import { Component } from "@angular/core";
import { CommonModule} from "@angular/common";

@Component({
  selector: 'stars-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  stars = Array.from({ length: 60 }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 2 + 1.5,
  }));
}

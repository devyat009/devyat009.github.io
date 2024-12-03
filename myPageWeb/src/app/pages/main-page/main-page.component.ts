import { Component, OnInit } from '@angular/core';
import { PageFooterComponent } from '../shared/page-footer/page-footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  avaibleToWork: boolean = true;

  
  constructor() { }

  ngOnInit() {
  }

}

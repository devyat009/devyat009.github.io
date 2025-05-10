import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  selectedIcon: HTMLElement | null = null;

  constructor(
    private elRef: ElementRef
    
  ) {

  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    const icons = this.elRef.nativeElement.querySelectorAll('.svg-cursor') as NodeListOf<HTMLElement>;

    icons.forEach((icon) => {
      icon.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;

        if (this.selectedIcon === target) {
          this.selectedIcon.classList.remove('selected');
          this.selectedIcon = null;
        } else {
          if (this.selectedIcon) {
            this.selectedIcon.classList.remove('selected');
          }
          target.classList.add('selected');
          this.selectedIcon = target;
          console.log(this.selectedIcon);
        }
      });
    });
  }
}

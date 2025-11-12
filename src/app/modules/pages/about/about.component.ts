import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { UnderMaintenceComponent } from "src/app/shared/components/under-maintence/under-maintence.component";

interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
  type?: 'mobile' | 'desktop';
}

interface TimelineItem {
  date: string;
  title: string;
  tag?: string
  subtitle?: string;
  description: string;
  footer?: string;
  type: 'personal' | 'professional';
  images?: TimelineImage[];
  active?: boolean;
}

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [
    TranslateModule,
    FooterComponent,
    UnderMaintenceComponent,
    NgClass,
    NgIf,
    NgFor
]
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('sectionsRef') sections!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('contentScroll') contentScroll!: ElementRef<HTMLDivElement>;

  timelineItems: TimelineItem[] = [
    {
      date: 'ABOUT_TIMELINE_01_DATE',
      tag: 'ABOUT_TIMELINE_01_TAG',
      title: 'ABOUT_TIMELINE_01_TITLE',
      subtitle: 'ABOUT_TIMELINE_01_SUBTITLE',
      description: 'ABOUT_TIMELINE_01_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_01_FOOTER',
      type: 'personal',
      active: true,
      // images: [
      //   { src: 'assets/img/inventario/login.png', alt: 'Painel Login', caption: 'Painel de Login' },
      //   { src: 'assets/img/inventario/inventario.png', alt: 'Tela Inventário', caption: 'Tela de Inventário' },
      //   { src: 'assets/img/inventario/vendas.png', alt: 'Tela Vendas', caption: 'Tela de Vendas' }
      // ]
    },
    {
      date: 'ABOUT_TIMELINE_02_DATE',
      tag: 'ABOUT_TIMELINE_02_TAG',
      title: 'ABOUT_TIMELINE_02_TITLE',
      subtitle: 'ABOUT_TIMELINE_02_SUBTITLE',
      description: 'ABOUT_TIMELINE_02_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_02_FOOTER',
      type: 'personal',
      images: [
        // { src: 'assets/img/padaria/home.png', alt: 'Tela Home' },
        // { src: 'assets/img/padaria/login.png', alt: 'Tela Login' },
        // { src: 'assets/img/padaria/produtos.png', alt: 'Lista de Produtos' }
      ]
    },
    {
      date: 'ABOUT_TIMELINE_03_DATE',
      tag: 'ABOUT_TIMELINE_03_TAG',
      title: 'ABOUT_TIMELINE_03_TITLE',
      subtitle: 'ABOUT_TIMELINE_03_SUBTITLE',
      description: 'ABOUT_TIMELINE_03_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_03_FOOTER',
      type: 'personal',
      images: [
        { src: 'https://private-user-images.githubusercontent.com/91706455/363386241-56505eb6-bda1-4159-a0b8-80da2a928d35.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5MTc2MzgsIm5iZiI6MTc2MjkxNzMzOCwicGF0aCI6Ii85MTcwNjQ1NS8zNjMzODYyNDEtNTY1MDVlYjYtYmRhMS00MTU5LWEwYjgtODBkYTJhOTI4ZDM1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTEyVDAzMTUzOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTljNDdkMzE2MzY4NWUxMGNjNDQ4NzRlMDIxMTFiOWQ2YzhkMjFjNDIyYmMzNmE5MzQxOWE1ZDBiOWU3MTExNTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0._M0gBfrXngt54ya5B-ZwJKRJHIrNzA0aN_-_URyLeyY',
          alt: 'Youtube Downloader', type: 'desktop' },
        // { src: 'assets/img/bradesco/bradesco2.png', alt: 'Bradesco' },
        // { src: 'assets/img/bradesco/bradesco3.png', alt: 'Bradesco' }
      ]
    },
    {
      date: 'ABOUT_TIMELINE_04_DATE',
      tag: 'ABOUT_TIMELINE_04_TAG',
      title: 'ABOUT_TIMELINE_04_TITLE',
      subtitle: 'ABOUT_TIMELINE_04_SUBTITLE',
      description: 'ABOUT_TIMELINE_04_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_04_FOOTER',
      type: 'professional',
      images: [
        // { src: 'assets/img/bradesco/bradesco.png', alt: 'Bradesco' },
        // { src: 'assets/img/bradesco/bradesco2.png', alt: 'Bradesco' },
        // { src: 'assets/img/bradesco/bradesco3.png', alt: 'Bradesco' }
      ]
    },
    {
      date: 'ABOUT_TIMELINE_05_DATE',
      tag: 'ABOUT_TIMELINE_05_TAG',
      title: 'ABOUT_TIMELINE_05_TITLE',
      subtitle: 'ABOUT_TIMELINE_05_SUBTITLE',
      description: 'ABOUT_TIMELINE_05_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_05_FOOTER',
      type: 'personal',
      images: [
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/map.png', alt: 'Projeto Onibus DF', type: 'mobile' },
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/paradas-proximas.png', alt: 'Projeto Onibus DF', type: 'mobile' },
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/configuracoes.png', alt: 'Projeto Confidencial', type: 'mobile' }
      ]
    }
  ];
  progressPercent = 0;
  private readonly baseProgress = 6;

  ngOnInit() {}

  ngAfterViewInit() {
    // força primeiro ativo
    this.timelineItems[0].active = true;
    // cálculo inicial após render
    setTimeout(() => {
      this.updateSections(true);
      this.updateProgress();
    }, 0);
  }

  onContentScroll() {
    this.updateSections();
    this.updateProgress();
  }

  private updateProgress() {
    const container = this.contentScroll?.nativeElement;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    if (scrollHeight <= 0) {
      this.progressPercent = this.baseProgress;
      return;
    }

    // percent cru 0–100
    const raw = scrollTop / scrollHeight * 100;
    // desloca mantendo piso baseProgress
    const shifted = raw * (100 - this.baseProgress) / 100 + this.baseProgress;
    this.progressPercent = Math.min(100, Math.max(this.baseProgress, shifted));
  }

  private updateSections(initial = false) {
    if (!this.sections) return;
    const container = this.contentScroll.nativeElement;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    let anyVisible = false;

    this.sections.forEach((ref, idx) => {
      const el = ref.nativeElement;
      const elTop = el.offsetTop;
      const elBottom = elTop + el.offsetHeight;

      const visible =
        elTop < (viewBottom - container.clientHeight * 0.25) &&
        elBottom > (viewTop + container.clientHeight * 0.15);

      if (initial && idx === 0) {
        this.timelineItems[idx].active = true;
        anyVisible = true;
        return;
      }

      this.timelineItems[idx].active = visible;
      if (visible) anyVisible = true;
    });

    if (!anyVisible) this.timelineItems[0].active = true;
  }

  // private updateProgress() {
  //   const doc = document.documentElement;
  //   const scrollTop = window.scrollY || doc.scrollTop;
  //   console.log('scrollTop', scrollTop);
  //   const scrollHeight = doc.scrollHeight - doc.clientHeight;
  //   console.log('scrollHeight', scrollHeight);
  //   this.progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  //   console.log('progressPercent', this.progressPercent);
  // }

  // private updateSections() {
  //   if (!this.sections) return;
  //   const viewportHeight = window.innerHeight;
  //   this.sections.forEach((ref, idx) => {
  //     const rect = ref.nativeElement.getBoundingClientRect();
  //     const visible = rect.top < viewportHeight * 0.65 && rect.bottom > viewportHeight * 0.2;
  //     this.timelineItems[idx].active = visible;
  //   });
  // }
}

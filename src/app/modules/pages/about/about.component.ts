import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, HostListener, OnInit } from "@angular/core";
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
    NgFor,
    NgStyle,
]
})
export class AboutComponent implements AfterViewInit, OnInit {
  @ViewChildren('sectionsRef') sections!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('contentScroll') contentScroll!: ElementRef<HTMLDivElement>;

  isMobile = false;

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
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/devyat009.github.io/projects/ytdownloader.png',
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

  ngOnInit() {
    this.evaluateViewport();
  }

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
    if (this.isMobile) return;
    this.updateSections();
    this.updateProgress();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isMobile) return;
    this.updateSections();
    this.updateProgress();
  }

  @HostListener('window:resize')
  onWindowResize() {
    const wasMobile = this.isMobile;
    this.evaluateViewport();
    if (wasMobile !== this.isMobile) {
      setTimeout(() => {
        this.updateSections(true);
        this.updateProgress();
      }, 0);
    }
  }

  private evaluateViewport() {
    if (typeof window === 'undefined') {
      this.isMobile = false;
      return;
    }
    this.isMobile = window.matchMedia('(max-width: 980px)').matches;
  }

  private updateProgress() {
    if (this.isMobile) {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        this.progressPercent = this.baseProgress;
        return;
      }

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;

      if (scrollHeight <= 0) {
        this.progressPercent = this.baseProgress;
        return;
      }

      const raw = scrollTop / scrollHeight * 100;
      const shifted = raw * (100 - this.baseProgress) / 100 + this.baseProgress;
      this.progressPercent = Math.min(100, Math.max(this.baseProgress, shifted));
      return;
    }

    const container = this.contentScroll?.nativeElement;
    if (!container) {
      this.progressPercent = this.baseProgress;
      return;
    }
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
    if (!this.sections?.length) return;

    if (this.isMobile) {
      if (typeof window === 'undefined') return;
      const viewportHeight = window.innerHeight || 0;
      let anyVisible = false;

      this.sections.forEach((ref, idx) => {
        const rect = ref.nativeElement.getBoundingClientRect();
        const visible =
          rect.top < viewportHeight * 0.65 &&
          rect.bottom > viewportHeight * 0.15;

        if (initial && idx === 0) {
          this.timelineItems[idx].active = true;
          anyVisible = true;
          return;
        }

        this.timelineItems[idx].active = visible;
        if (visible) anyVisible = true;
      });

      if (!anyVisible) this.timelineItems[0].active = true;
      return;
    }

    const container = this.contentScroll?.nativeElement;
    if (!container) return;
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

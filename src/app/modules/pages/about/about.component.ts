import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, HostListener, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { StarsComponent } from "src/app/shared/components/stars/stars.component";

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

interface HobbyPhoto {
  title: string;
  description: string;
  image: string;
  alt: string;
  highlight?: boolean;
  customCss?: string;
  customStyle?: Record<string, string>;
}

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [
    TranslateModule,
    FooterComponent,
    NgClass,
    NgIf,
    NgFor,
    NgStyle,
    StarsComponent
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
        { src: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/bakery/bakery-login.png?raw=true', alt: 'PrototypeLogin', type: 'mobile' },
        { src: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/bakery/bakery-home.png?raw=true', alt: 'PrototypeHome', type: 'mobile' },
        { src: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/bakery/bakery-item.png?raw=true', alt: 'PrototypeItem', type: 'mobile' },
        { src: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/bakery/bakery-user.png?raw=true', alt: 'PrototypeUser', type: 'mobile' }
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
  hobbyPhotos: HobbyPhoto[] = [
    {
      title: 'ABOUT_HOBBY_PHOTO_CLOUDS_TITLE',
      description: 'ABOUT_HOBBY_PHOTO_CLOUDS_DESC',
      image: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/clouds.png?raw=true',
      alt: 'ABOUT_HOBBY_PHOTO_CLOUDS_ALT',
      highlight: true,
    },
    {
      title: 'ABOUT_HOBBY_PHOTO_ARARA_TITLE',
      description: 'ABOUT_HOBBY_PHOTO_ARARA_DESC',
      image: 'https://github.com/devyat009/image-repo-for-my-repo/blob/main/devyat009.github.io/about-me/arara.png?raw=true',
      alt: 'ABOUT_HOBBY_PHOTO_ARARA_ALT',
      customCss: 'scale-[1.08] group-hover:!scale-[1.12]',
      customStyle: { objectPosition: 'center 18%' }
    }
  ];
  progressPercent = 0;
  private readonly baseProgress = 6;

  getHobbyImageClasses(photo: HobbyPhoto): string {
    const baseHeights = photo.highlight
      ? 'h-[260px] sm:h-[320px] lg:h-[360px]'
      : 'h-[220px] sm:h-[260px]';
    return photo.customCss ? `${baseHeights} ${photo.customCss}` : baseHeights;
  }

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

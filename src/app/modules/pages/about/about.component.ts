import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, HostListener, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { StarsComponent } from "src/app/shared/components/stars/stars.component";
import { ImageModalService } from "src/app/shared/services/image-modal.service";

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
  link?: string;
  linkIcon?: 'github' | 'globe';
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
  @ViewChildren('dateItem') dateItems!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('datesContainer') datesContainer?: ElementRef<HTMLUListElement>;
  @ViewChild('contentScroll') contentScroll!: ElementRef<HTMLDivElement>;

  isMobile = false;
  private lastActiveMobileIdx = -1;

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
      link: 'https://github.com/devyat009/youtube-downloader',
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
      link: 'https://github.com/devyat009/onibus-df-app',
      linkIcon: 'github',
      images: [
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/v2/map.png', alt: 'Brasília Mob', type: 'mobile' },
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/v2/paradas-proximas.png', alt: 'Brasília Mob', type: 'mobile' },
        { src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/bus-tracker/v2/configuracoes.png', alt: 'Brasília Mob - Configurações', type: 'mobile' }
      ]
    },
    {
      date: 'ABOUT_TIMELINE_06_DATE',
      tag: 'ABOUT_TIMELINE_06_TAG',
      title: 'ABOUT_TIMELINE_06_TITLE',
      subtitle: 'ABOUT_TIMELINE_06_SUBTITLE',
      description: 'ABOUT_TIMELINE_06_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_06_FOOTER',
      type: 'personal',
      link: 'https://github.com/devyat009/redragon_m719_pro',
      linkIcon: 'github',
      images: [
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/redragon_m719_pro/img1.png',
          alt: 'Redragon Suite - Mapeamento e Bateria',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_06_IMG1_CAPTION'
        },
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/redragon_m719_pro/img2.png',
          alt: 'Redragon Suite - Configuração de DPI',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_06_IMG2_CAPTION'
        },
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/redragon_m719_pro/img4.png',
          alt: 'Redragon Suite - Iluminação RGB',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_06_IMG4_CAPTION'
        },
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/redragon_m719_pro/img5.png',
          alt: 'Redragon Suite - Diagnóstico USB HID',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_06_IMG5_CAPTION'
        }
      ]
    },
    {
      date: 'ABOUT_TIMELINE_07_DATE',
      tag: 'ABOUT_TIMELINE_07_TAG',
      title: 'ABOUT_TIMELINE_07_TITLE',
      subtitle: 'ABOUT_TIMELINE_07_SUBTITLE',
      description: 'ABOUT_TIMELINE_07_DESCRIPTION',
      footer: 'ABOUT_TIMELINE_07_FOOTER',
      type: 'personal',
      link: 'https://devyat009.github.io/rdr2-map-site/',
      linkIcon: 'globe',
      images: [
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/devyat009.github.io/projects/rdr-2-map/rdr-2-map.png',
          alt: 'RDR2 Map - Visão Geral do Mapa Interativo',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_07_IMG1_CAPTION'
        },
        {
          src: 'https://raw.githubusercontent.com/devyat009/image-repo-for-my-repo/refs/heads/main/devyat009.github.io/projects/rdr-2-map/rdr-2-map-collectables.png',
          alt: 'RDR2 Map - Colecionáveis, Filtros e Heatmaps',
          type: 'desktop',
          caption: 'ABOUT_TIMELINE_07_IMG2_CAPTION'
        }
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

  constructor(private imageModalService: ImageModalService) {}

  openImage(src: string, alt?: string, caption?: string, title?: string) {
    this.imageModalService.open({ src, alt, caption, title });
  }

  scrollToItem(index: number) {
    const sectionsArray = this.sections?.toArray();
    if (!sectionsArray || !sectionsArray[index]) return;
    const targetEl = sectionsArray[index].nativeElement;

    if (this.isMobile) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.timelineItems.forEach((item, i) => (item.active = i === index));
      this.lastActiveMobileIdx = index;
      this.centerActiveDate(index, true);
    } else {
      const container = this.contentScroll?.nativeElement;
      if (container) {
        const topPos = targetEl.offsetTop - 16;
        container.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  }

  private centerActiveDate(index: number, smooth = true) {
    const container = this.datesContainer?.nativeElement;
    const items = this.dateItems?.toArray();
    if (!container || !items || !items[index]) return;

    const dateEl = items[index].nativeElement;
    const containerRect = container.getBoundingClientRect();
    const dateRect = dateEl.getBoundingClientRect();

    const targetLeft =
      dateRect.left -
      containerRect.left +
      container.scrollLeft -
      container.clientWidth / 2 +
      dateRect.width / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? 'smooth' : 'auto',
    });
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

  onContentWheel(event: WheelEvent) {
    if (this.isMobile) return;
    const el = this.contentScroll?.nativeElement;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 3;
    const isAtTop = el.scrollTop <= 3;

    if (isAtBottom && event.deltaY > 0) {
      window.scrollBy({ top: event.deltaY, behavior: 'auto' });
    } else if (isAtTop && event.deltaY < 0) {
      window.scrollBy({ top: event.deltaY, behavior: 'auto' });
    }
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
      this.lastActiveMobileIdx = -1;
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
      const sectionsArray = this.sections.toArray();
      const firstRect = sectionsArray[0].nativeElement.getBoundingClientRect();
      const lastRect = sectionsArray[sectionsArray.length - 1].nativeElement.getBoundingClientRect();

      let activeIndex = -1;

      // When scrolled past the entire timeline (e.g. into Hobbies or Footer)
      if (lastRect.bottom <= viewportHeight * 0.2) {
        activeIndex = this.timelineItems.length - 1;
      } else if (firstRect.top >= viewportHeight * 0.65) {
        // Timeline hasn't been scrolled into view yet
        activeIndex = 0;
      } else {
        // Choose the section closest to reading focus (~35% from viewport top, below sticky timeline bar)
        const focusY = viewportHeight * 0.35;
        let closestDist = Infinity;

        sectionsArray.forEach((ref, idx) => {
          const rect = ref.nativeElement.getBoundingClientRect();
          const visible =
            rect.top < viewportHeight * 0.7 &&
            rect.bottom > viewportHeight * 0.15;

          if (visible) {
            const sectionCenter = (rect.top + rect.bottom) / 2;
            const dist = Math.abs(sectionCenter - focusY);
            if (dist < closestDist) {
              closestDist = dist;
              activeIndex = idx;
            }
          }
        });

        if (activeIndex === -1) {
          activeIndex = this.lastActiveMobileIdx >= 0 ? this.lastActiveMobileIdx : 0;
        }
      }

      if (initial) {
        activeIndex = 0;
      }

      this.timelineItems.forEach((item, idx) => {
        item.active = idx === activeIndex;
      });

      if (activeIndex !== this.lastActiveMobileIdx) {
        this.lastActiveMobileIdx = activeIndex;
        this.centerActiveDate(activeIndex, !initial);
      }
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
}

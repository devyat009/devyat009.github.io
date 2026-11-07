import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  NgZone
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isAnchor: boolean;
}

@Component({
  selector: 'stars-component',
  standalone: true,
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('constellationCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private stars: Star[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;

  // Mouse state with smooth lag (easing)
  private mouse = {
    x: -2000,
    y: -2000,
    targetX: -2000,
    targetY: -2000,
    isActive: false,
    alpha: 0
  };

  private boundOnMouseMove!: (e: MouseEvent) => void;
  private boundOnMouseLeave!: () => void;
  private boundOnTouchMove!: (e: TouchEvent) => void;
  private boundOnTouchEnd!: () => void;
  private boundOnResize!: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initCanvas();
    this.createStars();
    this.initEvents();

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.removeEvents();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    this.updateDimensions();
  }

  private updateDimensions(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || typeof window === 'undefined') return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = Math.floor(this.width * this.dpr);
    canvas.height = Math.floor(this.height * this.dpr);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  private createStars(): void {
    if (this.width === 0 || this.height === 0) return;

    // Density adapted to screen area
    const count = Math.min(95, Math.max(40, Math.floor((this.width * this.height) / 16000)));
    this.stars = [];

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (let i = 0; i < count; i++) {
      const isAnchor = Math.random() < 0.15; // 15% anchor stars (brighter constellation nodes)
      const speed = prefersReducedMotion ? 0 : (Math.random() * 0.35 + 0.1);
      const angle = Math.random() * Math.PI * 2;

      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: isAnchor ? (Math.random() * 0.8 + 2.0) : (Math.random() * 0.9 + 1.0),
        baseAlpha: isAnchor ? 0.85 : (Math.random() * 0.4 + 0.35),
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        isAnchor
      });
    }
  }

  private initEvents(): void {
    this.boundOnMouseMove = (e: MouseEvent) => {
      if (this.mouse.targetX === -2000) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.isActive = true;
    };

    this.boundOnMouseLeave = () => {
      this.mouse.isActive = false;
    };

    this.boundOnTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (this.mouse.targetX === -2000) {
          this.mouse.x = touch.clientX;
          this.mouse.y = touch.clientY;
        }
        this.mouse.targetX = touch.clientX;
        this.mouse.targetY = touch.clientY;
        this.mouse.isActive = true;
      }
    };

    this.boundOnTouchEnd = () => {
      this.mouse.isActive = false;
    };

    this.boundOnResize = () => {
      this.updateDimensions();
      this.createStars();
    };

    window.addEventListener('mousemove', this.boundOnMouseMove, { passive: true });
    window.addEventListener('mouseleave', this.boundOnMouseLeave, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchEnd, { passive: true });
    window.addEventListener('resize', this.boundOnResize, { passive: true });
  }

  private removeEvents(): void {
    if (typeof window === 'undefined') return;

    if (this.boundOnMouseMove) window.removeEventListener('mousemove', this.boundOnMouseMove);
    if (this.boundOnMouseLeave) window.removeEventListener('mouseleave', this.boundOnMouseLeave);
    if (this.boundOnTouchMove) window.removeEventListener('touchmove', this.boundOnTouchMove);
    if (this.boundOnTouchEnd) window.removeEventListener('touchend', this.boundOnTouchEnd);
    if (this.boundOnResize) window.removeEventListener('resize', this.boundOnResize);
  }

  private getPrimaryRgb(): { r: number; g: number; b: number } {
    if (typeof document === 'undefined') return { r: 89, g: 109, b: 199 };
    const raw = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();
    if (raw.startsWith('#') && raw.length === 7) {
      return {
        r: parseInt(raw.substring(1, 3), 16),
        g: parseInt(raw.substring(3, 5), 16),
        b: parseInt(raw.substring(5, 7), 16)
      };
    }
    return { r: 89, g: 109, b: 199 }; // #596dc7 fallback
  }

  private animate(): void {
    const loop = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private render(): void {
    if (!this.ctx || this.width === 0 || this.height === 0) return;

    const isDark = typeof document !== 'undefined'
      ? !document.body.classList.contains('theme-light')
      : true;

    const rgb = this.getPrimaryRgb();

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Mouse lag & alpha interpolation
    if (this.mouse.isActive) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;
      this.mouse.alpha += (1 - this.mouse.alpha) * 0.08;
    } else {
      this.mouse.alpha += (0 - this.mouse.alpha) * 0.04;
    }

    // 2. Draw ambient mouse glow (cor ascendente da marca)
    if (this.mouse.alpha > 0.005) {
      const glowRadius = Math.min(this.width, this.height, 160);
      const glowBaseAlpha = isDark ? 0.22 : 0.10;
      const currentGlowAlpha = glowBaseAlpha * this.mouse.alpha;

      const glow = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, glowRadius
      );
      glow.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentGlowAlpha})`);
      glow.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentGlowAlpha * 0.45})`);
      glow.addColorStop(0.65, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentGlowAlpha * 0.12})`);
      glow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

      this.ctx.fillStyle = glow;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, glowRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 3. Update star positions
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around edges
      if (star.x < 0) star.x = this.width;
      else if (star.x > this.width) star.x = 0;

      if (star.y < 0) star.y = this.height;
      else if (star.y > this.height) star.y = 0;
    }

    // 4. Draw constellation lines between stars
    const maxDist = 120;
    const maxDistSq = maxDist * maxDist;
    const lineBaseAlpha = isDark ? 0.20 : 0.12;

    for (let i = 0; i < this.stars.length; i++) {
      const s1 = this.stars[i];
      for (let j = i + 1; j < this.stars.length; j++) {
        const s2 = this.stars[j];
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * lineBaseAlpha;

          this.ctx.beginPath();
          this.ctx.moveTo(s1.x, s1.y);
          this.ctx.lineTo(s2.x, s2.y);
          this.ctx.strokeStyle = isDark
            ? `rgba(145, 165, 250, ${alpha})`
            : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.9})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.stroke();
        }
      }
    }

    // 5. Draw interactive constellation lines connecting stars to mouse
    if (this.mouse.alpha > 0.05) {
      const mouseMaxDist = 130;
      const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;

      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const dx = star.x - this.mouse.x;
        const dy = star.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseMaxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / mouseMaxDist) * 0.45 * this.mouse.alpha;

          this.ctx.beginPath();
          this.ctx.moveTo(star.x, star.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = isDark
            ? `rgba(180, 195, 255, ${alpha})`
            : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.stroke();
        }
      }
    }

    // 6. Draw stars & constellation nodes
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = (Math.sin(star.twinklePhase) + 1) / 2; // 0 to 1
      const alpha = star.baseAlpha * (0.5 + 0.5 * twinkle);

      // Anchor stars aura glow
      if (star.isAnchor) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.6, 0, Math.PI * 2);
        this.ctx.fillStyle = isDark
          ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.35})`
          : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.22})`;
        this.ctx.fill();
      }

      // Star core
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isDark
        ? (star.isAnchor ? `rgba(255, 255, 255, ${alpha})` : `rgba(220, 230, 255, ${alpha})`)
        : (star.isAnchor ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : `rgba(120, 130, 160, ${alpha})`);
      this.ctx.fill();
    }
  }
}

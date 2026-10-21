import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ImageModalData, ImageModalService } from '../../services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss'
})
export class ImageModalComponent implements OnInit, OnDestroy {
  @ViewChild('viewportRef') viewportRef?: ElementRef<HTMLDivElement>;
  @ViewChild('imageRef') imageRef?: ElementRef<HTMLImageElement>;

  isOpen = false;
  imageLoaded = false;
  currentData: ImageModalData | null = null;

  // Zoom and pan
  scale = 1;
  readonly minScale = 1;
  readonly maxScale = 5;
  readonly scaleStep = 0.5;

  translateX = 0;
  translateY = 0;

  // Dragging state
  isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private initialTranslateX = 0;
  private initialTranslateY = 0;

  // Touch pinch state
  private initialPinchDist = 0;
  private initialPinchScale = 1;

  private subscription = new Subscription();

  constructor(
    public imageModalService: ImageModalService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.imageModalService.isOpen$.subscribe(open => {
        this.isOpen = open;
        if (open) {
          this.resetTransform();
          this.lockBodyScroll(true);
        } else {
          this.lockBodyScroll(false);
          this.currentData = null;
        }
        this.cdr.markForCheck();
      })
    );

    this.subscription.add(
      this.imageModalService.data$.subscribe(data => {
        this.currentData = data;
        this.imageLoaded = false;
        this.resetTransform();
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.lockBodyScroll(false);
  }

  private lockBodyScroll(lock: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  }

  onImageLoad() {
    this.imageLoaded = true;
    this.resetTransform();
    this.cdr.markForCheck();
  }

  close() {
    this.imageModalService.close();
  }

  onBackdropClick(event: MouseEvent) {
    // Only close if clicking on the background backdrop container directly
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  resetTransform() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
  }

  zoomIn() {
    this.zoomTo(this.scale + this.scaleStep);
  }

  zoomOut() {
    this.zoomTo(this.scale - this.scaleStep);
  }

  resetZoom() {
    this.zoomTo(1);
  }

  zoomTo(targetScale: number, focalPoint?: { x: number; y: number }) {
    const clampedScale = Math.max(this.minScale, Math.min(this.maxScale, targetScale));
    if (clampedScale === this.scale && !focalPoint) return;

    const oldScale = this.scale;
    this.scale = Math.round(clampedScale * 100) / 100;

    if (this.scale <= 1) {
      this.translateX = 0;
      this.translateY = 0;
      this.cdr.markForCheck();
      return;
    }

    if (focalPoint && this.viewportRef) {
      const rect = this.viewportRef.nativeElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = focalPoint.x - centerX;
      const relY = focalPoint.y - centerY;

      const scaleRatio = this.scale / oldScale;
      const proposedX = relX - (relX - this.translateX) * scaleRatio;
      const proposedY = relY - (relY - this.translateY) * scaleRatio;

      const clamped = this.clampTranslation(proposedX, proposedY, this.scale);
      this.translateX = clamped.x;
      this.translateY = clamped.y;
    } else {
      const clamped = this.clampTranslation(this.translateX, this.translateY, this.scale);
      this.translateX = clamped.x;
      this.translateY = clamped.y;
    }

    this.cdr.markForCheck();
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.35 : -0.35;
    this.zoomTo(this.scale + delta, { x: event.clientX, y: event.clientY });
  }

  onDoubleClick(event: MouseEvent) {
    event.preventDefault();
    if (this.scale > 1) {
      this.zoomTo(1);
    } else {
      this.zoomTo(2.2, { x: event.clientX, y: event.clientY });
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.scale <= 1) return;
    if (event.button !== 0) return; // Only primary left-click

    event.preventDefault();
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.initialTranslateX = this.translateX;
    this.initialTranslateY = this.translateY;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();

    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;

    const clamped = this.clampTranslation(
      this.initialTranslateX + dx,
      this.initialTranslateY + dy,
      this.scale
    );
    this.translateX = clamped.x;
    this.translateY = clamped.y;
    this.cdr.markForCheck();
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.cdr.markForCheck();
    }
  }

  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      if (this.scale <= 1) return;
      this.isDragging = true;
      this.dragStartX = event.touches[0].clientX;
      this.dragStartY = event.touches[0].clientY;
      this.initialTranslateX = this.translateX;
      this.initialTranslateY = this.translateY;
    } else if (event.touches.length === 2) {
      this.isDragging = false;
      const t1 = event.touches[0];
      const t2 = event.touches[1];
      this.initialPinchDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      this.initialPinchScale = this.scale;
    }
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 1 && this.isDragging && this.scale > 1) {
      event.preventDefault();
      const dx = event.touches[0].clientX - this.dragStartX;
      const dy = event.touches[0].clientY - this.dragStartY;
      const clamped = this.clampTranslation(
        this.initialTranslateX + dx,
        this.initialTranslateY + dy,
        this.scale
      );
      this.translateX = clamped.x;
      this.translateY = clamped.y;
      this.cdr.markForCheck();
    } else if (event.touches.length === 2) {
      event.preventDefault();
      const t1 = event.touches[0];
      const t2 = event.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (this.initialPinchDist > 0) {
        const factor = currentDist / this.initialPinchDist;
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;
        this.zoomTo(this.initialPinchScale * factor, { x: midX, y: midY });
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (event.touches.length === 0) {
      this.isDragging = false;
      this.initialPinchDist = 0;
    } else if (event.touches.length === 1) {
      this.initialPinchDist = 0;
      if (this.scale > 1) {
        this.isDragging = true;
        this.dragStartX = event.touches[0].clientX;
        this.dragStartY = event.touches[0].clientY;
        this.initialTranslateX = this.translateX;
        this.initialTranslateY = this.translateY;
      }
    }
    this.cdr.markForCheck();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isOpen) {
      const clamped = this.clampTranslation(this.translateX, this.translateY, this.scale);
      this.translateX = clamped.x;
      this.translateY = clamped.y;
      this.cdr.markForCheck();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      this.zoomIn();
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      this.zoomOut();
    } else if (event.key === '0' || event.key.toLowerCase() === 'r') {
      event.preventDefault();
      this.resetZoom();
    } else if (this.scale > 1) {
      const step = 45;
      let dx = 0;
      let dy = 0;
      if (event.key === 'ArrowLeft') dx = step;
      if (event.key === 'ArrowRight') dx = -step;
      if (event.key === 'ArrowUp') dy = step;
      if (event.key === 'ArrowDown') dy = -step;

      if (dx !== 0 || dy !== 0) {
        event.preventDefault();
        const clamped = this.clampTranslation(this.translateX + dx, this.translateY + dy, this.scale);
        this.translateX = clamped.x;
        this.translateY = clamped.y;
        this.cdr.markForCheck();
      }
    }
  }

  /**
   * Respeita rigorosamente os limites da modal:
   * Calcula as dimensões base ajustadas à viewport da modal e não permite que
   * a imagem seja arrastada além das suas bordas visíveis na escala atual.
   */
  private clampTranslation(x: number, y: number, scale: number): { x: number; y: number } {
    const viewport = this.viewportRef?.nativeElement;
    const img = this.imageRef?.nativeElement;

    if (!viewport || !img || scale <= 1) {
      return { x: 0, y: 0 };
    }

    const vWidth = viewport.clientWidth;
    const vHeight = viewport.clientHeight;
    const nWidth = img.naturalWidth || vWidth;
    const nHeight = img.naturalHeight || vHeight;

    if (nWidth === 0 || nHeight === 0 || vWidth === 0 || vHeight === 0) {
      return { x: 0, y: 0 };
    }

    // Proporção de contenção dentro do container da modal (object-fit: contain)
    const fitRatio = Math.min(vWidth / nWidth, vHeight / nHeight);
    const baseW = nWidth * fitRatio;
    const baseH = nHeight * fitRatio;

    const currentW = baseW * scale;
    const currentH = baseH * scale;

    let clampedX = 0;
    if (currentW > vWidth) {
      const maxTranslateX = (currentW - vWidth) / 2;
      clampedX = Math.max(-maxTranslateX, Math.min(maxTranslateX, x));
    }

    let clampedY = 0;
    if (currentH > vHeight) {
      const maxTranslateY = (currentH - vHeight) / 2;
      clampedY = Math.max(-maxTranslateY, Math.min(maxTranslateY, y));
    }

    return { x: clampedX, y: clampedY };
  }

  get localizedTitle(): string {
    if (!this.currentData?.title) return '';
    return this.translateService.instant(this.currentData.title);
  }

  get localizedCaption(): string {
    if (!this.currentData?.caption) return '';
    return this.translateService.instant(this.currentData.caption);
  }

  get zoomPercentage(): number {
    return Math.round(this.scale * 100);
  }
}

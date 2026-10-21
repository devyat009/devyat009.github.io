import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageModalData {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {
  private _isOpen$ = new BehaviorSubject<boolean>(false);
  private _data$ = new BehaviorSubject<ImageModalData | null>(null);

  isOpen$ = this._isOpen$.asObservable();
  data$ = this._data$.asObservable();

  open(data: ImageModalData) {
    this._data$.next(data);
    this._isOpen$.next(true);
  }

  close() {
    this._isOpen$.next(false);
    this._data$.next(null);
  }
}

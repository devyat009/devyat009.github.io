import { DOCUMENT } from "@angular/common";
import { Injectable, Inject } from "@angular/core";
import { StorageService } from "./storageService.service";




@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService
  ) {}


  switchTheme(theme: string){
      let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

      if (themeLink) {
        themeLink.href = `assets/themes/${theme}.css`;
        console.log('theme changed, setting for localstorage...');
        this.storageService.set('theme', theme);
      }
    }
}

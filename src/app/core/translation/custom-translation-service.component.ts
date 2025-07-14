import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { join } from 'path';

declare const require: any;
const fs = require('fs');

export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    // Point to the 'i18n' folder inside the final build output directory ('docs')
    private i18n_folder: string = join(process.cwd(), 'docs', 'assets', 'i18n')
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const translations = this.loadTranslations(this.i18n_folder, lang);
    return of(translations);
  }

  /**
   * Recursively reads translation files for a specific language from a directory.
   */
  private loadTranslations(dir: string, lang: string): any {
    let translations = {};
    try {
      // Check if the directory exists before trying to read it
      if (!fs.existsSync(dir)) {
        return {};
      }

      const files = fs.readdirSync(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = join(dir, file.name);
        if (file.isDirectory()) {
          // Load from subdirectories
          const subTranslations = this.loadTranslations(fullPath, lang);
          translations = { ...translations, ...subTranslations };
        } else if (file.isFile() && file.name === `${lang}.json`) {
          // Load the translation file
          const content = fs.readFileSync(fullPath, 'utf8');
          const json = JSON.parse(content);
          translations = { ...translations, ...json };
        }
      }
    } catch (e) {
      console.warn(`Warning: Could not process translation directory ${dir}.`, e);
    }
    return translations;
  }
}

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function ApplicationInitializerFactory(
  translate: TranslateService, injector: Injector) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    translate.addLangs(['en', 'ru', 'geo']);
    const default_browser_lang = localStorage.getItem('default_lang');

    if (default_browser_lang) {
      translate.setDefaultLang(default_browser_lang);
      translate.use(default_browser_lang);
    }


    if (!default_browser_lang) { // если язык по умолчанию не задан
      // здесь сохраняем язык по умоланчию для будущих загрузок
      // localStorage.setItem('default_lang', 'ru');
      // здесь задаем язык по умоланчию
      try {
      localStorage.setItem('default_lang', 'ru');
        translate.setDefaultLang('ru');
        await translate.use('ru').toPromise();
      } catch (error) {

      }
    }

  
    console.log(`Successfully initialized ${default_browser_lang} language.`);
  };
}


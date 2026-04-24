import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GooglePlacesInterceptor } from './shared/interceptors/google.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ApplicationInitializerFactory, HttpLoaderFactory } from './shared/translation.config';
import { LightboxModule } from 'ngx-lightbox';
import { ClipboardModule } from 'ngx-clipboard';
import { TwUiKitLocalModule } from './modules/tw-ui-kit-local/tw-ui-kit-local.module';
import { PopoverModule } from './modules/ui/popover/popover.module';
import { TwAlertModule } from './modules/tw-ui-kit-local/tw-alert/tw-alert.module';
import { TimeagoModule } from "ngx-timeago";
import { MessageBarNotifyModule } from './modules/message-bar/message-bar.module';


export function createTranslateLoader(http: HttpClient) {
  console.log('FeatureModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}

registerLocaleData(localeRu, 'ru');



export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};



@NgModule({
  declarations: [AppComponent],
  imports: [
    TwUiKitLocalModule,
    MessageBarNotifyModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    }),
    TimeagoModule.forRoot(),
    LightboxModule,
    HttpClientModule,
    AppRoutingModule,
    ClipboardModule,
    TwAlertModule,
    NoopAnimationsModule,
    PopoverModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      // enabled: !isDevMode(),
      enabled: false,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
],
  exports: [
    TranslateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: GooglePlacesInterceptor, multi: true},
    DatePipe,
    
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [ TranslateService, Injector ],
      multi: true
    },

],
  bootstrap: [AppComponent],
})
export class AppModule {
}


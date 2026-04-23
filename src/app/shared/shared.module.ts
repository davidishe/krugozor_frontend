import { ModuleWithProviders, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedTranslateModule implements OnDestroy {
  
  sub: Subscription;

  constructor(public translationService: TranslateService) {

	this.sub = this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        console.log(' ==> FeatureModule ', lang);
        this.translationService.use(lang.lang);
      });
	}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }




}

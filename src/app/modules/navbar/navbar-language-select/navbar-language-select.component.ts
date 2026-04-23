import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PopoverService } from '../../ui/popover/popover.service';
import { PopoverTypes } from '../../ui/popover/popover-type';



@Component({
  selector: 'app-navbar-language-select',
  templateUrl: './navbar-language-select.component.html',
  styleUrls: ['./navbar-language-select.component.scss']
})
export class NavbarLanguageSelectComponent implements OnInit, OnDestroy {

  langCode: string;
  sub: Subscription;

  constructor(
    private popoverService: PopoverService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.langCode = this.translateService.currentLang;
    this.sub = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
      this.langCode = event.lang;
    });

  }


  openLangSelect(): void {
      const popoverData = this.popoverService.getPopoverStatus();
      popoverData.status = true;
      popoverData.popoverType = PopoverTypes.lang;
      popoverData.blackWrapper = true;
      this.popoverService.setPopoverStatus(popoverData);
  }

  ngOnDestroy(): void {
    this.sub
  }



}

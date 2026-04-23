import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IPopoverData } from '../../popover/popover';
import { Observable } from 'rxjs';
import { PopoverService } from '../../popover/popover.service';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.css']
})
export class LangSelectComponent implements OnInit {

  popoverState$!: Observable<IPopoverData | null>;
  languages: any[] = [
    {
      name: 'Russian',
      iconPath: 'country_ru',
      infoParam: 'ru',
      isEnabled: true
    },
    {
      name: '中國人',
      iconPath: 'country_zh',
      infoParam: 'zh',
      isEnabled: false
    },
    {
      name: 'عرب',
      iconPath: 'country_ar',
      infoParam: 'ar',
      isEnabled: false
    },
    {
      name: 'English',
      iconPath: 'country_en',
      infoParam: 'en',
      isEnabled: false
    },
    {
      name: 'ქართული',
      iconPath: 'country_geo',
      infoParam: 'geo',
      isEnabled: false
    },
  ];

  constructor(
    private popoverService: PopoverService,
    private router: Router,
    private translateService: TranslateService,
    private proposalService: ProposalsService
  ) {
  }
  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    this.popoverState$ = this.popoverService.popoverState$;
    
  }

  closePopover(): void {
    this.popoverService.closePopover();
  }

  setLang(infoParam: string): void {
        localStorage.setItem('default_lang', infoParam);
        this.translateService.use(infoParam);
        this.translateService.reloadLang(infoParam);
        
        // меняем язык в параметрах запроса
        const params = this.proposalService.getQueryParams();
        params!.currentLangCode = infoParam;
        if(params)
          this.proposalService.setQueryParams(params);
        this.popoverService.closePopover();
        
        this.router.navigate(['dashboard/items']).then(() => {
          window.location.reload();
        });
  }
}

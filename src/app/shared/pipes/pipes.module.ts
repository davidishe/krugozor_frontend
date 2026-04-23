import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckLangSelectedPipe } from './check-lang-selected.pipe';
import { DateTimeProposalPipe } from './date-time-proposal-picker.pipe';
import { LanguagePipe } from './language.pipe';
import { SafePipe } from './safe-pipe.pipe';
import { TimeAgoProposalPipe } from './time-ago-proposal.pipe';
import { DateAgoPipe } from './time-ago.pipe';
import { TimeStampPipe } from './time-stamp.pipe';
import { CheckCitySelectedPipe } from './check-city-selected.pipe';
import { ColorGradientPipe } from './gradient.pipe';
import { SecurePipe } from './secure.pipe';
import { RequestsPipe } from './requests.pipe';
import { DateTimeLocalePipe } from './date-time-locale.pipe';
import { AgePipe } from './age.pipe';
import { StrapiBreadcrumbsPipe } from './generic/breadcrumbs.pipe';
import { StrapiBreadcrumbsSelectorPipe } from './generic/breadcrumbs-selector.pipe';
import { DateLocalePipe } from './date-locale.pipe';
import { RequestStatusNamePipe } from './custom/request-status-name.pipe';
import { ProfileStatusNamePipe } from './custom/profile-status-name.pipe';
import { FilterTypesPipe } from './filter-types.pipe';
import { IsFavouritedPipe } from './generic/is-favourited.pipe';
import { MessengerOnlinePipe } from './messenger/online.pipe';
import { SortByOrderPipe } from './generic/sort.pipe';
import { UnreadMessagesPipe } from './messenger/unread.pipe';
import { MimePipe } from './messenger/mime.pipe';
import { FileSizePipe } from './messenger/file-size.pipe';
import { LastMessegePipe } from './messenger/last-messege.pipe';


const MESSENGER_PIPES = [
    MessengerOnlinePipe,
    UnreadMessagesPipe,
    MimePipe,
    FileSizePipe,
    LastMessegePipe,
]


const ALL_PYPES = [
    DateAgoPipe,
    TimeStampPipe,
    DateTimeProposalPipe,
    TimeAgoProposalPipe,
    LanguagePipe,
    SafePipe,
    CheckLangSelectedPipe,
    CheckCitySelectedPipe,
    ColorGradientPipe,
    SecurePipe,
    RequestsPipe,
    DateTimeLocalePipe,
    AgePipe,
    StrapiBreadcrumbsPipe,
    DateLocalePipe,
    StrapiBreadcrumbsSelectorPipe,
    RequestStatusNamePipe,
    ProfileStatusNamePipe,
    FilterTypesPipe,
    IsFavouritedPipe,
    SortByOrderPipe,
];


@NgModule({
  declarations: [	
    ALL_PYPES,
    MESSENGER_PIPES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ALL_PYPES,
    MESSENGER_PIPES
  ],
  providers: [
    ALL_PYPES
  ]
})
export class PipesModule { }

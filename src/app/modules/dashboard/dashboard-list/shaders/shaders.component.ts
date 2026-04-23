import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopoverData } from 'src/app/modules/ui/popover/popover';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-shaders',
  templateUrl: './shaders.component.html',
  styleUrls: ['./shaders.component.css']
})
export class ShadersComponent implements OnInit {

  shadersStatus$: Observable<IPopoverData>;
  categorys$: Observable<any>;
  array: Array<any> =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  shader: any = {
        id: 5,
        attributes: {
          name: "Название загружается",
          description: "👤Описание загружается ...",
          isUrgent: false,
          isFake: false,
          createdAt: "2022-12-06T11:43:19.087Z",
          updatedAt: "2023-01-10T16:21:20.771Z",
          publishedAt: "2022-12-06T11:43:23.728Z",
          locale: "ru",
          languageSpeaker: [
            "Russian"
          ],
          storeTelegramContactOwner: null,
          storeTelegramContactForShow: null,
          storeRating: null,
          storeInstagramContact: null,
          storeFacebookContact: null,
          storeAddress: null,
          verificationType: null,
          images: {
            data: [{
              id: 40,
              attributes: {
                name: "изтеглен файл.png",
                alternativeText: "изтеглен файл.png",
                caption: "изтеглен файл.png",
                width: 299,
                height: 168,
                formats: {
                  thumbnail: {
                    ext: ".png",
                    url: "/uploads/thumbnail_izteglen_fajl_fe60bc24d4.png",
                    hash: "thumbnail_izteglen_fajl_fe60bc24d4",
                    mime: "image/png",
                    name: "thumbnail_изтеглен файл.png",
                    path: null,
                    size: 27.08,
                    width: 245,
                    height: 138
                  }
                },
                hash: "izteglen_fajl_fe60bc24d4",
                ext: ".png",
                mime: "image/png",
                size: 12.64,
                url: "/uploads/izteglen_fajl_fe60bc24d4.png",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                createdAt: "2023-01-08T20:42:58.555Z",
                updatedAt: "2023-01-08T20:42:58.555Z"
              }
            }]
          },
          category: {
            data: {
              id: 6,
              attributes: {
                name: "Репетиторы",
                placeholderImage: "placeholder",
                createdAt: "2022-11-27T18:37:44.929Z",
                updatedAt: "2022-11-30T19:40:02.872Z",
                publishedAt: "2022-11-27T18:37:45.989Z",
                locale: "ru"
              }
            }
          },
          cities: {
            data: [{
              id: 3,
              attributes: {
                name: "Любой город",
                createdAt: "2022-11-27T18:53:22.785Z",
                updatedAt: "2022-11-27T18:53:25.949Z",
                publishedAt: "2022-11-27T18:53:25.945Z",
                locale: "ru"
              }
            }]
          },
          localizations: {
            data: []
          }
        }
      };

  constructor(
    private stateService: PopoverService,
    private proposalService: ProposalsService
  ) { }

  ngOnInit() {
    this.shadersStatus$ = this.stateService.popoverState$;
    this.categorys$ = this.proposalService.proposalTypes$;
  }

}

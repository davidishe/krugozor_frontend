import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IImageResponse } from 'src/app/models/main/image';
import { IPhoto } from 'src/app/models/user/photo';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ProposalsService } from 'src/app/services/proposals.service';
import { environment } from 'src/environments/environment';
import { MyProposalsService } from '../../dashboard-agent-proposals.service';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';

@Component({
  selector: 'app-my-proposal-page-images',
  templateUrl: './my-proposal-page-images.component.html',
  styleUrls: ['./my-proposal-page-images.component.css']
})
export class MyProposalPageImagesComponent implements OnInit {

  @Input() images: any[] = [];


  imageUri = environment.imageUri;
  progress: boolean = false;
  backendUrl = environment.baseUri;
  currentUser$: Observable<IUser>;
  @Input() currentProposal: any;


  @Output() public OnUploadFinished = new EventEmitter();
  public result?: IPhoto;

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private alertService: TwAlertService,
    private myProposalsService: MyProposalsService

  ) { }

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
  }

  public uploadFile = (files) => {

    if(this.progress)
      return;

    this.progress = true;

    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File> files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.result = null;



    
    this.http.post(this.backendUrl + 'strapi/add/image', formData, {reportProgress: true, observe: 'events'})
      .subscribe((res: any) => {
        if (res.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round(100 * res.loaded / res.total);
          this.progress = true;
        } else if (res.type === HttpEventType.Response) {
          this.OnUploadFinished.emit(res.body);
          const responseImages: any[] = res.body;
          const newImage = { id: responseImages[0].id, attributes: responseImages[0] }
          if(this.images === null)
              this.images = [];

          this.images.push(newImage);

          this.linkImagesToProposal();
        }
    });
  }


  deleteImage(image: any) {
    this.progress = true;
    console.log(image);
    this.images = this.images.filter(z => z.id !== image.id);
    this.linkImagesToProposal();
  }


  linkImagesToProposal() {

    let imagesToUpdate: IStrapiAbstractFieldDto[] = [];
    this.images.forEach(img => {
      imagesToUpdate.push({ id: img.id });
    });


    const strapiDto: IStrapiDto = {
      strapiProposalId: this.currentProposal.data.id,
      name: this.currentProposal.data.attributes.name,
      description: this.currentProposal.data.attributes.description,
      price: this.currentProposal.data.attributes.price,
      images: imagesToUpdate

    }

    this.myProposalsService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
      if (res) {
        let message = "Данные успешно обновлены";
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        this.progress = false;
      }
    })
    
  }

}

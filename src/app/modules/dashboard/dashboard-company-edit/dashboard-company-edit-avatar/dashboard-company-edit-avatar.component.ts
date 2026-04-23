import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/models/user/photo';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-dashboard-company-edit-avatar',
  templateUrl: './dashboard-company-edit-avatar.component.html',
  styleUrls: ['./dashboard-company-edit-avatar.component.css']
})
export class DashboardCompanyEditAvatarComponent implements OnInit {

  // images: any[] = [];
  progress: boolean = false;
  backendUrl = environment.baseUri;
  imageUri = environment.imageUri;
  @Input() currentCompany: any;
  image: IStrapiAbstractFieldDto;
  currentImageUrl: string;

  @Output() public OnUploadFinished = new EventEmitter();
  public result?: IPhoto;

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private myCompanyService: CompanyService,

  ) { }

  ngOnInit() {
    if(this.currentCompany?.data?.attributes?.images?.data?.length > 0)
      this.currentImageUrl = this.currentCompany?.data?.attributes?.images?.data[0]?.attributes?.formats?.small?.url;
  }

  public uploadFile = (files) => {
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

          // if(this.image === null)
            //     this.curentImageUrl = '';

          this.image = (newImage);

          this.linkImagesToProposal();
        }
    });
  }


  deleteImage(image: any) {
    this.progress = true;
    console.log(image);
    this.image = null;
    this.linkImagesToProposal();
  }


  linkImagesToProposal() {

    // let imagesToUpdate: IStrapiAbstractFieldDto[] = [];
    // this.images.forEach(img => {
    //   imagesToUpdate.push({ id: img.id });
    // });

    // console.log(this.currentCompany);

    const strapiDto: IStrapiDto = {
      name: "",
      isTechnical: false,
      strapiProposalId: this.currentCompany.data.id,
      images: [this.image]
    }

    

    this.myCompanyService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
      if (res) {
        const parsedResult = JSON.parse(res.content);
        // console.log(parsedResult);
        this.currentImageUrl = strapiDto.images[0].attributes.formats.small.url;
        this.progress = false;
      }
    })
    
  }

}

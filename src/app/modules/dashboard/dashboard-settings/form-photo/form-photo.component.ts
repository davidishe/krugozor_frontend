import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/models/user/photo';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-photo',
  templateUrl: './form-photo.component.html',
  styleUrls: ['./form-photo.component.css']
})
export class FormPhotoComponent implements OnInit {

  progress: number;
  baseUrl = environment.baseUri;
  currentUser$: Observable<IUser>;


  @Output() public OnUploadFinished = new EventEmitter();
  public result?: IPhoto;

  constructor(
    private authService: AuthService,
    public http: HttpClient,

  ) { }

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File> files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.result = null;

    
    this.http.post(this.baseUrl + 'photo/user', formData, {reportProgress: true, observe: 'events'})
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.OnUploadFinished.emit(event.body);
          this.authService.loadCurrentUser().subscribe((res: IUser) => {
            if (res) {
              // this.currentUser$.pictureUrl = event.body.photoUrl;
              // this.authService.changePictureProfile();
              this.authService.patchUserValue(res);
              
              this.progress = 0;
            }
          })
        }
    });
  }

}

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent-proposal-edit-files',
  templateUrl: './agent-proposal-edit-files.component.html',
  styleUrls: ['./agent-proposal-edit-files.component.css']
})
export class AgentProposalEditFilesComponent implements OnInit {

  // progress: boolean;
  @Input() currentProposal: any;
  @Input() currentProfile: any;

  isLoading: boolean = false;
  progress: number;
  baseUrl = environment.baseUri;
  @Output() public OnUploadFinished = new EventEmitter();
  public result?: any;

  constructor(
    public http: HttpClient,
  ) { }

  ngOnInit() {
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File> files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.result = null;
    this.isLoading = true;
  
    
    this.http.post(this.baseUrl + 'files/invest_passport/' + this.currentProfile.strapiProposalId, formData, {reportProgress: true, observe: 'events'})
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.OnUploadFinished.emit(event.body);
          console.log(event.body);
          this.currentProfile.investPassportLink = event.body.investPassportLink;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpEventType, HttpResponse, HttpErrorResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { FileUpload } from './file-upload';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  private _isUploading: boolean;
  private _currentlyUploading: BehaviorSubject<boolean>;
  private _files: FileUpload[] = [];
  private _uploadQueue: BehaviorSubject<FileUpload[]>;
  baseUrl = environment.baseUri;

  constructor(private http: HttpClient) {
    this._isUploading = false;
    this._currentlyUploading = new BehaviorSubject(this._isUploading);
    this._uploadQueue = new BehaviorSubject([]);
  }

  public get queue() {
    return this._uploadQueue.asObservable();
  }

  public getImages(messageId: number) {
    return this.http.get<any>(this.baseUrl + 'fileupload/files/' + messageId);
  }


  public sendMessage(recepientId: number, text: string) {
    return this.http.post(this.baseUrl + `fileupload/files/message/${recepientId}?text=${text}`, null);
  }


  public addToQueue(file: File, messageId: number) {
    const queuedUploadFile = new FileUpload(file);
    this._files.push(queuedUploadFile);

    this._uploadQueue.next(this._files);

    this.checkAndUploadNextFile(messageId);
  }

  private checkAndUploadNextFile(messageId: number) {
    if (this._isUploading)
      return;

    let firstChoice = this._files.find(f => f.isWaitingForUpload);
    if (firstChoice)
      this.upload(firstChoice, messageId);
  }

  private upload(queuedUploadFile: FileUpload, messageId: number) {
    this.isUploading = true;
    queuedUploadFile.updateProgress(0);

    const request = this.createRequest(queuedUploadFile, messageId);
    this.http.request(request)
      .pipe(
        finalize(() => {
          // Upload beendet. Egal ob erfolgreich oder fehlgeschlagen.
          this.isUploading = false;
          this.checkAndUploadNextFile(messageId);
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          queuedUploadFile.updateProgress(percentDone);
        } else if (event instanceof HttpResponse) {
          queuedUploadFile.completed();
        }

        this._uploadQueue.next(this._files);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          queuedUploadFile.failed();
        } else {
          // The backend returned an unsuccessful response code.
          queuedUploadFile.failed();
        }

        this._uploadQueue.next(this._files);
      }, () => {
        console.info("completed!");
      });
  }

  private set isUploading(value: boolean) {
    this._isUploading = value;
    this._currentlyUploading.next(value);
  }

  private createRequest(queuedUploadFile: FileUpload, messageId: number) {
    const formData = new FormData();
    console.log(queuedUploadFile.file);
    formData.append('files', queuedUploadFile.file, queuedUploadFile.file.name);
    const request = new HttpRequest('POST', `${environment.baseUri}fileupload/files/${messageId}`, formData, {
      reportProgress: true
    });
    return request;
  }



}
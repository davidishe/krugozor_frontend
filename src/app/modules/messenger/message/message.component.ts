import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../auth/auth-models/user';
import { IMessageImage } from '../models/message-image';
import { IMessage } from '../models/message';
import { UploadService } from '../upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IFileHandle } from '../models/file-hande';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  @Input() isMyMessage: boolean;
  @Input() userToShow: IUser;
  @Input() elementId: string;
  @Input() message: IMessage;
  // @Input() fileData: IMessageImage[] = [];
  images: IMessageImage[] = [];
  files: IFileHandle[] = [];

  constructor(
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
  ) { }

  async ngOnInit() {
    if(this.message?.id > 0 && this.message.withImages) {
      await this.getImages();
      // console.log(this.message);
    }
    
  }


  // async getImages() {
  //     for (let index = 0; index < this.message.images.length; index++) {
  //       const item = this.message.images[index];
  //       const fileBlob = this.getImageFromByte(item.docByte, item.fileType);
  //       const fileData = new File([fileBlob], item.fileName, {type: item.fileType});
  //       const file: IFileHandle = {
  //         file: fileData,
  //         url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileData)),
  //         docByte: item.docByte,
  //         fileName: item.fileName,
  //         fileType: item.fileType,
  //         fileSize: item.size
  //       };
  //       this.files.push(file);
  //     }
  // }


  async getImages() {
    this.uploadService.getImages(this.message.id).subscribe((res: any[]) => {
      for (let index = 0; index < res.length; index++) {
        this.message.images = res;
        // console.log(res);
        
        const item = res[index];
        const fileBlob = this.getImageFromByte(item.docByte, item.fileType);
        const fileData = new File([fileBlob], item.fileName, {type: item.fileType});
        const file: IFileHandle = {
          file: fileData,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileData)),
          docByte: item.docByte,
          fileName: item.fileName,
          fileType: item.fileType,
          fileSize: item.size
        };
        this.files.push(file);
      }

      this.message.images = this.files;
    });
  }

  getImageFromByte(data: any, fileType: string) {
    const byteString = window.atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let index = 0; index < byteString.length; index++) {
      int8Array[index] = byteString.charCodeAt(index);
    }

    const blob = new Blob([int8Array], {type: fileType});
    return blob;
  }


  save(file: IFileHandle) {
    console.log(file);
    saveAs(file.file, file.fileName);
  }

}

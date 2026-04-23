import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { IImageSlider } from 'src/app/models/main/image';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {



  @Input() imageObject: any[] = [];
  images: IImageSlider[] = [];

  constructor(private _lightbox: Lightbox) {
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.images, index, 
      {
        centerVertically: true, 
        enableTransition: false,
        showRotate: true,
        fitImageInViewPort: true,
        resizeDuration: 0.2,
        fadeDuration: 0
      });
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit() {
    for (const key in this.imageObject) {
      const image: IImageSlider = {
        thumb: 'http://localhost:1337' + this.imageObject[key].attributes.formats.medium.url,
        src: 'http://localhost:1337' + this.imageObject[key].attributes.formats.medium.url,
      }
      this.images.push(image);
    }

    console.log(this.images);
    
  }



}
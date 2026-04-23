import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mime'
})
export class MimePipe implements PipeTransform {

  transform(mimeType: string): string {



    if(mimeType.includes('video/'))
      return 'mime_excel';


    if(mimeType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document'))
      return 'mime_doc';

    if(mimeType.includes('application/x-rar-compressed') || mimeType.includes('application/zip'))
      return 'mime_archive';

    if(mimeType.includes('video/'))
      return 'mime_video';

    if(mimeType.includes('audio/'))
      return 'mime_audio';

    if(mimeType.includes('application/pdf'))
      return 'mime_pdf';

    if(mimeType.includes('image/'))
      return 'mime_img';


    if(mimeType.includes('presentationml'))
      return 'mime_presentation';


    else
      return 'mime_others';

    }

}


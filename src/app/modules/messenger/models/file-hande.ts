import { SafeUrl } from "@angular/platform-browser";

export interface IFileHandle {
  file: File,
  url: SafeUrl,
  fileName: string;
  fileType: string;
  fileSize: number;
  docByte: Int32Array;

}
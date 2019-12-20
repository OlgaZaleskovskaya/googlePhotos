import { Injectable } from '@angular/core';
import { IPhoto } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  currentPhoto: IPhoto;
  photoWidth: number;
  photoHeight: number;

  constructor() { }

  getPhoto(width: number, height: number): string {
    const originalWidth = this.currentPhoto.width;
    const originalHeight = this.currentPhoto.height;
    const phOrientation = originalWidth > originalHeight ? "horizontal" : "vertical";
    const wOrientation = width > height ? "horizontal" : "vertical";

    if ((phOrientation == wOrientation && phOrientation == "horizontal") || (phOrientation != wOrientation && wOrientation == "horizontal")) {
      this.photoWidth = Math.min(originalWidth, width);
      this.photoHeight = Math.round((originalHeight * this.photoWidth) / originalWidth);
    };

    if ((phOrientation == wOrientation && phOrientation == "vertical") || (phOrientation != wOrientation && wOrientation == "horizontal")) {
      this.photoHeight = Math.min(originalHeight, height);
      this.photoWidth = Math.round((originalWidth * this.photoHeight) / originalHeight);
    }

    const url = this.currentPhoto.baseUrl;
    this.currentPhoto.baseUrl = url.slice(0, url.lastIndexOf('=')) + "=w" + this.photoWidth + "-h" + this.photoHeight;
    return this.currentPhoto.baseUrl;
  }
}

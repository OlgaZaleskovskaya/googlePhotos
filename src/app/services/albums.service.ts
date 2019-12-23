import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IAlbum, IPhotoSize, IPhoto, IImgObject } from '../shared/model';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class AlbumsService {
    albumList: Array<IAlbum>;
    coverPhotoSize: IPhotoSize = { x: 300, y: 300 };
    albums = new Subject<Array<IAlbum>>();
    albumContent = new Subject<Array<IPhoto>>();
    initialPhotoSize = [500, 500];
    // loadedImageSbj = new Subject<string>();
    subjOnCreateAbum = new Subject<string>();
    subjOnUploadImgs = new Subject<string>();

    constructor(private http: HttpService, public datepipe: DatePipe) {

    }

    getAlbums(token: string): Observable<Array<IAlbum>> {
        return this.http.getAlbums(token)
            .pipe(tap(val => console.log(val)),
                map(val => this.createAlbums(val)),
            );
    }

    private createAlbums(obj: Object): IAlbum[] {
        const arr = obj['albums'];
        let albumsList = [];
        arr.forEach(val => {
            const tempo = { ...val } as IAlbum;
            albumsList.push(tempo);
        })
        this.albumList = albumsList;
        return this.defineCoverSize(albumsList);
    }

    private defineCoverSize(albums: IAlbum[]): IAlbum[] {
        let result =
            albums.map(album => {
                const url = album['coverPhotoBaseUrl'] + '=w' + this.coverPhotoSize.x + '-h' + this.coverPhotoSize.y;
                album['coverPhotoBaseUrl'] = url;
                return album;
            })
        this.albums.next(result);
        return result;
    }

    getAlbumContent(id: string, size: IPhotoSize): Observable<Array<any>> {
        return this.http.getAlbumContent(id)
            .pipe(map(res => {
                res = res.mediaItems.map(item => this.createPhotoObject(item, size));
                return res;
            }
            ), tap(res => this.albumContent.next(res))
            );
    }

    createPhotoObject(obj: Object, size: IPhotoSize): IPhoto {
        let photo = {} as IPhoto;
        photo.id = obj['id'];
        photo.filename = obj['filename'];
        photo.width = obj['mediaMetadata']['width'];
        photo.height = obj['mediaMetadata']['height'];
        photo.description = obj['description'] ? obj['description'] : "no description";
        photo.baseUrl = obj['baseUrl'] + '=w' + size.x + '-h' + size.y;
        photo.productUrl = obj['productUrl'];
        if (obj['mediaMetadata']) {
            var tempoData = new Date(Date.parse(obj['mediaMetadata']['creationTime']));
        } else {
            var tempoData = new Date(Date.parse(obj['creationDate']));
        }
        photo.creationDate = this.datepipe.transform(tempoData, 'yyyy-MM-dd');
        return photo;
    }



    addFiles(files: IImgObject[], albId: string) {
    
        setTimeout(() => this.subjOnUploadImgs.next('success'), 100000);
        // this.http.addFiles(files, albId).subscribe(res => this.subjOnUploadImgs.next('success'), error => this.subjOnUploadImgs.next('error'));
        ;

    }



    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    createAlbum(name: string): void {
        this.http.createAlbum(name)
            .subscribe(res => this.subjOnCreateAbum.next('success'), error => this.subjOnCreateAbum.next('error'));
    }
}
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IAlbum, IPhotoSize, IPhoto, IImgObject } from '../shared/model';
import { AuthService } from './auth.service';




@Injectable()
export class AlbumsService {
    albumList: Array<IAlbum>;
    coverPhotoSize: IPhotoSize = { x: 300, y: 300 };
    albums = new Subject<Array<IAlbum>>();
    albumContent = new Subject<Array<IPhoto>>();
    initialPhotoSize = [500, 500];
    subjOnCreateAlbum = new Subject<string>();
    subjOnAddAlbum = new Subject<Array<IAlbum>>();
    subjOnUploadImgs = new Subject<string>();

    constructor(private http: HttpService, public datepipe: DatePipe, public auth: AuthService) {

    }

    public getAlbums(token: string): Observable<Array<IAlbum>> {
        return this.http.getAlbums(token)
            .pipe(
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



    public addFiles(files: IImgObject[], albId: string): void {

        setTimeout(() => this.subjOnUploadImgs.next('success'), 2000);
        // this.http.addFiles(files, albId).subscribe(res => this.subjOnUploadImgs.next('success'), error => this.subjOnUploadImgs.next('error'));
        ;

    }





    public createNewAlbum(name: string): void {
        this.http.createAlbum(name)
            .subscribe(res => {
                const alb = {id: res.id,
                title: res.title,
                productUrl: null,
                coverPhotoBaseUrl: null,
                coverPhotoMediaItemId: null,
                isWriteable: true,
                mediaItemsCount: 0};
                this.subjOnCreateAlbum.next('success');
               // const token = localStorage.getItem('accessToken');
                console.log('album', res);
                // this.getAlbums(token).subscribe(res => {
                //     this.subjOnAddAlbum.next(res);
                // });
            }, error => this.subjOnCreateAlbum.next('error'));
    }
}
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';
import { concatMap, catchError,  map, mergeMap, toArray } from 'rxjs/operators';
import { IImgObject } from '../shared/model';

@Injectable()

export class HttpService {
    accessToken: string;
    constructor(private http: HttpClient, private auth: AuthService) {

    }

    getAlbums(token: string): Observable<any> {
        this.accessToken = token;
        const URL = 'https://photoslibrary.googleapis.com/v1/albums';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return this.http.get(URL, httpOptions);
        // .pipe(
        //     catchError(this.handleError)
        // );
    }

    getAlbumContent(id: string): Observable<any> {
        const URL = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application / json',
                'Authorization': 'Bearer ' + this.accessToken
            })
        };
        const body =
        {
            "pageSize": "100",
            "albumId": id
        };
        return this.http.post<Object>(URL, body, httpOptions);
        // .pipe(
        //   catchError(console.log("this.handleError"))
        // );
    }

    addFiles(files: IImgObject[], albId: string) {
     return   from(files).pipe(
            concatMap(res => this.getImgStr(res.file).pipe(map(res1 => {
                const BODY = {
                    "description": res.description,
                    "simpleMediaItem": {
                        "uploadToken": res1
                    }
                };
                return BODY;
            }))
            )
            , toArray()
            , mergeMap(res3 => this.addImages(res3, albId))
        );
     //   .subscribe(res => console.log('onAddFiles')
     //   );

    }

    private getImgStr(file: File) {
        const URL = 'https://photoslibrary.googleapis.com/v1/uploads';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/octet-stream',
                'Authorization': 'Bearer ' + this.accessToken,
                'X-Goog-Upload-File-Name': file.name,
                'X-Goog-Upload-Protocol': 'raw'
            })
        };
        return this.http.post(URL, file, { headers: httpOptions.headers, responseType: 'text' });

    }

    private addImages(body: Array<Object>, albId: string): Observable<any> {
        const URL = 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate?key=AIzaSyD0oufAi5KrIvEUoKOLW33nKFfYY7OjF0Y';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken,
                'Accept': 'application/json'
            })
        };
        const BODY = {
            "albumId": albId,
            "newMediaItems": body
        };
        return this.http.post(URL, BODY, httpOptions);
    }

    createAlbum(name: string): Observable<any> {
        const URL = 'https://photoslibrary.googleapis.com/v1/albums';
        const BODY = {
            album: {
                id: "",
                title: name,
                coverPhotoBaseUrl: "",
                isWriteable: true,
                coverPhotoMediaItemId: "",
                mediaItemsCount: 0,
                productUrl: "",
                shareInfo: {
                    isOwned: false
                }
            }
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/octet-stream',
                'Authorization': 'Bearer ' + this.accessToken,
            })
        };
        return this.http.post(URL, BODY, httpOptions);
    }

    

}
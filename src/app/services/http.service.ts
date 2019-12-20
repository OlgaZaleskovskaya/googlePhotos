import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from './auth.service';
import { concatMap, catchError, tap, map, mergeMap, toArray } from 'rxjs/operators';
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
        return this.http.get(URL, httpOptions).pipe(
            catchError(this.handleError)
        );
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
        return this.http.post<Object>(URL, body, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    addFiles(files: IImgObject[], albId: string){
        console.log("onGetStr", albId);
         from(files).pipe(
            concatMap(res => this.getImgStr(res.file).pipe(map(res1 => {
                const BODY = {
                    "description": res.description,
                    "simpleMediaItem": {
                       // "fileName": res.name,
                        "uploadToken": res1
                    }
                };
                return BODY;
            }))
            )
            , toArray()
            , mergeMap(res3 => this.addImages(res3, albId))
        ).subscribe(res => {console.log('res');
            console.log(res);
        });
       
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
    //TODO: remove method
    // addFile(file: any, fileName: string, albId: string): Observable<any> {
    //     console.log('onAddFile');
    //     const URL = 'https://photoslibrary.googleapis.com/v1/uploads';
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-type': 'application/octet-stream',
    //             'Authorization': 'Bearer ' + this.accessToken,
    //             'X-Goog-Upload-File-Name': fileName,
    //             'X-Goog-Upload-Protocol': 'raw'
    //         })
    //     };

    //     return this.http.post(URL, file, { headers: httpOptions.headers, responseType: 'text' })
    //         .pipe(
    //             concatMap(str => {
    //                 const URL = 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate?key=AIzaSyD0oufAi5KrIvEUoKOLW33nKFfYY7OjF0Y';
    //                 const httpOptions2 = {
    //                     headers: new HttpHeaders({
    //                         'Content-type': 'application/json',
    //                         'Authorization': 'Bearer ' + this.accessToken,
    //                         'Accept': 'application/json'
    //                     })
    //                 };
    //                 const BODY1 = {
    //                     "albumId": albId,
    //                     "newMediaItems": [
    //                         {
    //                             "description": "test photo",
    //                             "simpleMediaItem": {
    //                                 "fileName": "myTestFile",
    //                                 "uploadToken": str
    //                             }
    //                         }
    //                     ]
    //                 };
    //                 return this.http.post(URL, BODY1, httpOptions2);
    //             }));
    // }

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
        return this.http.post(URL, BODY, httpOptions).pipe(
            catchError(this.handleError)
        );
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

}
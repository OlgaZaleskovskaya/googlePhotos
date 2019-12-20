import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlbumsService } from '../services/albums.service';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IPhotoSize } from '../shared/model';

@Injectable()
export class AlbumDetailResolverService implements Resolve<string[]> {

    constructor(private as: AlbumsService, private router: Router) {
    }
    initialPhotoSize: IPhotoSize = {x: 500, y: 500};
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> | Observable<never> {
        let id = route.paramMap.get('id');
        return this.as.getAlbumContent(id, this.initialPhotoSize).pipe(
            mergeMap(res => {
                if (res) {   
                    return of(res);
                } else {
                    this.router.navigate(['/main/album', id]); //check path
                    return EMPTY;
                }
            })
        );
    }


}
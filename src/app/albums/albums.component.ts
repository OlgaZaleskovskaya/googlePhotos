import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IAlbum } from '../shared/model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

 albums: Subject<Array<IAlbum>>;
  albumsList: Array<IAlbum>;
  subscription: Subscription;

  constructor(private albumsService: AlbumsService,
    private router: Router,
    private route: ActivatedRoute) {
  }
 
  ngOnInit() {
    this.albumsList = this.albumsService.albumList;
    this.subscription = this.albumsService.albums
      .subscribe(res => this.albumsList = res)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  selectAlbum(id: string, name: string) {
    this.router.navigate(['/main/album', id, { name: name }]);
  }



}

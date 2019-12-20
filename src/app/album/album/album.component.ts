import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { IPhoto } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {


  id: string;
  name: string;
  photoList: Array<Object>;
  phList: Array<IPhoto>;

  // paginations
  length: number = 50;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  startIndex: number;
  endIndex: number;


  pageEvent: PageEvent;


  constructor(private router: Router, private route: ActivatedRoute, private albService: AlbumService) {
    this.startIndex = this.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }



  ngOnInit() {
    this.photoList = new Array();
    this.phList = new Array();
    this.route.data
      .subscribe((data: any) => {
        this.photoList = data['album'];
      }).unsubscribe();
    this.name = this.route.snapshot.params['name'];
  }

  onPageChange(event: PageEvent) {
    this.length = event.length;
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
  }

  selectPhoto(photo: IPhoto) {
    this.albService.currentPhoto = photo;
    this.router.navigate(['../photo'], { relativeTo: this.route });
  }

}

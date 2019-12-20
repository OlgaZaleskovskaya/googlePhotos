import { Component, OnInit, Inject } from '@angular/core';
import { AlbumService } from '../album.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
currentUrl: string;
  constructor(private route: ActivatedRoute, private router: Router, private albService: AlbumService,    @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    const wHeight = this.document.documentElement.clientHeight;
    const wWidth = this.document.documentElement.clientWidth;
    this.currentUrl = this.albService.getPhoto(wWidth, wHeight);
  }

  goBack(){
    this.router.navigate(['../'],  { relativeTo: this.route });
  }

}

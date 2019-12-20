import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAlbum } from '../shared/model';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AuthService]
})
export class MainComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private albService: AlbumsService, private auth: AuthService) { }
  accessToken: string;
  albums: Observable<Array<IAlbum>>;

  menu = [{ item: 'Albums', content: 'Content1' }, { item: 'Edit', content: "Content2" }]

  ngOnInit() {
    console.log('on init main');
    const route = this.route.snapshot.fragment;
    const token = this.auth.fetchAccessToken(route);
    this.albService.getAlbums(token).subscribe();
    this.router.navigate(['./main']);
  }

  toEditAlbums() {
    this.router.navigate([{ outlets: { edit: 'edit' } }]);
  }

  myMethod(ev: any) {

    if (ev['index'] == 1) {
      console.log(this.route);
      this.router.navigate([{ outlets: { editAlbum: ['edit'] } }], { relativeTo: this.route});
    } else {
      console.log('index == 0');
      this.router.navigate([{ outlets: { editAlbum: null } }]);
      this.router.navigate(['/main/']);
    }
  }
}

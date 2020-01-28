import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAlbum, ITheme } from '../shared/model';
import { AlbumsService } from '../services/albums.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AuthService]
})
export class MainComponent implements OnInit, OnDestroy {


  constructor(private route: ActivatedRoute, private router: Router, private albService: AlbumsService, private auth: AuthService) { }
  accessToken: string;
  albums: Observable<Array<IAlbum>>;
  subscription: Subscription;
  themes: string[];
  currentTheme: string;
  currentThemeIndex: number;

  menu = [{ item: 'Albums', content: 'Content1' }, { item: 'Edit', content: "Content2" }]

  ngOnInit() {
    const route = this.route.snapshot.fragment;
    const token = this.auth.fetchAccessToken(route);
    this.subscription = this.albService.getAlbums(token).subscribe();
    this.router.navigate(['./main']);
    this.themes = ['default-theme','pink-dark-theme', 'green-light-theme'];
  
    this.currentTheme = this.themes[0];
  }

  toEditAlbums() {
    this.router.navigate([{ outlets: { edit: 'edit' } }]);
  }

  myMethod(ev: any) {

    if (ev['index'] == 1) {
      this.router.navigate([{ outlets: { editAlbum: ['edit'] } }], { relativeTo: this.route });
    } else {

      this.router.navigate([{ outlets: { editAlbum: null } }]);
      this.router.navigate(['/main/']);
    }
  }

  changeTheme() {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

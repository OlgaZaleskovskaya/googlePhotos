import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AlbumsComponent } from './albums/albums.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InitialComponent } from './initial/initial.component';
import { EditAlbumComponent } from './edit-album/edit-album/edit-album.component';



const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: '', component: AlbumsComponent },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(mod => mod.AlbumModule),
      },
      {  path: 'edit', component: EditAlbumComponent, outlet: 'editAlbum'}
    ]
  },
  { path: '', component: InitialComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }


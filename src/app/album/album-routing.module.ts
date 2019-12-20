import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { AlbumDetailResolverService } from './album-detail-resolver-service';
import { PhotoComponent } from './photo/photo.component';



const routes: Routes = [
  { path: 'photo', component: PhotoComponent },
  {
    path: ':id', component: AlbumComponent, resolve: {
      album: AlbumDetailResolverService
    }
  },
  { path: '', redirectTo: '/:id' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
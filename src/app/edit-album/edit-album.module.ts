import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DndDirective } from './draggable/dnd.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material.module';
import { EditImgComponent } from './edit-img/edit-img.component';
import { NewAlbumComponent } from './new-album/new-album.component';





@NgModule({
  declarations: [EditAlbumComponent, DndDirective, EditImgComponent, NewAlbumComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
   
   
  ],
  exports: [EditAlbumComponent],
  entryComponents: [EditImgComponent, NewAlbumComponent]
})
export class EditAlbumModule { }

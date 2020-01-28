import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AlbumsService } from 'src/app/services/albums.service';
import { IAlbum, IImgObject } from 'src/app/shared/model';
import { ComponentType } from '@angular/cdk/portal';

import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { EditImgComponent } from '../edit-img/edit-img.component';
import { NewAlbumComponent } from '../new-album/new-album.component';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerComponent } from 'src/app/albums/spinner/spinner.component';


@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),

  ]
})
export class EditAlbumComponent<T> implements OnInit {
  currentImgIndex: number;
  currentImg: File;
  currentImgObject: IImgObject;
  imgList: IImgObject[];



  fileToUpload: File = null;
  body: any;
  albId: string;
  selectedAlbum: IAlbum;
  albumList: IAlbum[];
  newAlbum: boolean;
  isLoading: boolean;
  addDescription: boolean;
 imagesForm = new FormGroup({
  });


  constructor(private albService: AlbumsService, private dialog: MatDialog, private ns: NotificationService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.newAlbum = false;
    this.albumList = this.albService.albumList.filter(alb => alb['isWriteable']);
    this.imgList = [];
    this.addDescription = false;
    this.albService.subjOnUploadImgs.subscribe(res => {
      if (res === "success") {
        this.ns.success(":: Images are upLoadeds");
        this.dialog.closeAll();
      } else {
        this.ns.notification(":: An error has occurred")

      }
    });
  }


  onDragFile(event) {
    for (let i = 0; i < event.length; i++) {
      if (!this.validateFile(event[i])) {
        alert("wrong format");
        break;
      }
      const imgObject = <IImgObject>{
        file: event[i],
        name: event[i].name,
        description: ''
      }
      this.imgList.push(imgObject)
    }
  }

  public onFileSelected(event): void {
    const img = <File>event.target.files[0];
    if (this.validateFile(img)) {
      const imgObject = <IImgObject>{
        file: img,
        name: img.name,
        description: ''
      }
      this.imgList.push(imgObject);
    } else {
     alert('Selected file format or file size is not supported');
    }
  }

  public onDeleteAttachment(index: number): void {
    this.imgList.splice(index, 1)
  }

  public onAddImage(form: NgForm): void {
    const id = this.selectedAlbum.id;
    this.albService.addFiles(this.imgList, id);
    this.onSpinnerCreate(SpinnerComponent);
  }

  public onEditImg(index: number): void {
    this.addDescription = true;
    this.currentImgIndex = index;
    this.currentImgObject = this.imgList[index];
    this.onCreatePopUp(EditImgComponent, '80%');

  }


 
  public onNewAlbum(): void {
    this.selectedAlbum = null;
    this.newAlbum = !this.newAlbum;
    this.onCreatePopUp(NewAlbumComponent, '60%');
  }

  private onCreatePopUp<T>(dialogComponent: ComponentType<T>, width: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width.toString();
    var matDialogRef = this.dialog.open(dialogComponent, dialogConfig);
    matDialogRef.afterClosed().subscribe(res => this.addDetails(res)
    );

  }

  private onSpinnerCreate<T>(dialogComponent: ComponentType<T>): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "100%";
    dialogConfig.panelClass = 'testClass';
    let matDialogRef = this.dialog.open(dialogComponent, dialogConfig);
    this.albService.subjOnUploadImgs.subscribe(res => {
      if (res == "success") {
        matDialogRef.close();
      }
    })
  }

  private addDetails(res: string[] | any) {
    if (Array.isArray(res) ) {
      this.imgList[this.currentImgIndex].name = res[0];
      if (res[1]) {
        this.imgList[this.currentImgIndex].description = res[1];
      }
    }
  }

  private validateFile(f: File): boolean {
   const ext = f.name.substring(f.name.lastIndexOf('.') + 1).toLowerCase();
    console.log('ext', ext);
    console.log('size', f.size);
    if ((ext == 'png' 
    || ext == 'jpg' 
    || ext == 'gif' 
    || ext =='tiff' 
    || ext =='bmp'
    || ext =='heic'
    || ext =='ico'
    || ext =='webp'
    ) && f.size < 7500000) {
      return true;
    } else {
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlbumsService } from 'src/app/services/albums.service';
import { IAlbum, IImgObject } from 'src/app/shared/model';
import { ComponentType } from '@angular/cdk/portal';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ..
} from '@angular/animations';
import { EditImgComponent } from '../edit-img/edit-img.component';
import { NewAlbumComponent } from '../new-album/new-album.component';

import { NotificationService } from 'src/app/services/notification.service';


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
  // currentName: string;
  // currentId: string;
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



  constructor(private router: Router,
    private albService: AlbumsService, private dialog: MatDialog, private ns: NotificationService) {
    // this.router.events
    //   .subscribe(res => {
    //     if (res['url']) {
    //       this.getCurrentData(res['url']);
    //     }
    //   });
  }


  imagesForm = new FormGroup({

  });

  ngOnInit() {
    this.isLoading = false;
    this.newAlbum = false;
    this.albumList = this.albService.albumList.filter(alb => alb['isWriteable']);
    this.imgList = [];
    this.addDescription = false;
    this.albService.subjOnUploadImgs.subscribe(res => {
      if (res === "success") {
        this.ns.success(":: Images are upLoadeds");
      } else {
        this.ns.notification(":: An error has occurred")

      }
    });
  }

  getCurrentData(str: string) {
    // const nameIndex = str.indexOf('name');
    // const nameEnd = str.indexOf('/', nameIndex);
    // this.currentName = str.slice(nameIndex + 5, nameEnd);
    // const t = str.indexOf('album/');
    // this.currentId = str.slice(t + 6, nameIndex - 1);
  }

  onDragFile(event) {
    for (let i = 0; i < event.length; i++) {
      if (!this.validateFile(event[i])) {
        console.log("wrong format");
        break;
      }
      const imgObject = <IImgObject>{
        file: event[i],
        name: event[i].name,
        description: ''
      }
      this.imgList.push(imgObject)
    }
    console.log( this.imgList);
  }

  onFileSelected(event) {
    const img = <File>event.target.files[0];
    const tempo = this.validateFile(img);
    console.log('boolean', tempo);
    if (this.validateFile(img)) {
      const imgObject = <IImgObject>{
        file: img,
        name: img.name,
        description: ''
      }
      this.imgList.push(imgObject);
    } else {
      console.log('Selected file format is not supported');
      return;
    }
  }

  onDeleteAttachment(index: number) {
    this.imgList.splice(index, 1)
  }

  onAddImage(form: NgForm) {
    const id = this.selectedAlbum.id;

    this.albService.addFiles(this.imgList, id);
  }

  onEditImg(index: number) {
    this.addDescription = true;
    this.currentImgIndex = index;
    this.currentImgObject = this.imgList[index];
    this.onCreatePopUp(EditImgComponent, '80%');

  }


  onCreateAlbum(form: NgForm) {
    const name = form.controls['name'].value;
    this.albService.createAlbum(name);
  }

  onNewAlbum() {
    this.selectedAlbum = null;
    this.newAlbum = !this.newAlbum;
    this.onCreatePopUp(NewAlbumComponent, '60%');
  }

  onCreatePopUp<T>(dialogComponent: ComponentType<T>, width: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width.toString();
    let matDialogRef = this.dialog.open(dialogComponent, dialogConfig);
    matDialogRef.afterClosed().subscribe(res => this.addDetails(res));

  }

  addDetails(res: string[] | any) {
    if (res) {
      this.imgList[this.currentImgIndex].name = res[0];
      if (res[1]) {
        this.imgList[this.currentImgIndex].description = res[1];
      }
    }
  }

  private validateFile(f: File): boolean {
    var ext = f.name.substring(f.name.lastIndexOf('.') + 1);

    if ((ext == 'png' || ext == 'jpg' || ext == 'gif') && f.size < 500000) {
      return true;
    } else {
      return false;
    }
  }
}

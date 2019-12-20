import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NewAlbumComponent } from '../new-album/new-album.component';
import { AlbumsService } from 'src/app/services/albums.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-img',
  templateUrl: './edit-img.component.html',
  styleUrls: ['./edit-img.component.scss']
})
export class EditImgComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    'name': new FormControl("", [Validators.required, Validators.minLength(1)]),
    'description': new FormControl("", [Validators.maxLength(1000)])

  });
  constructor(public dialogRef: MatDialogRef<NewAlbumComponent>) { }

  ngOnInit() {

  }

  onClose(arr?: string[]) {
    this.myForm.reset();
    this.dialogRef.close(arr);
  }

  onSubmit() {
    const name = this.myForm.controls['name'].value;
    const description = this.myForm.controls['description'].value;
    this.onClose([name, description]);
  }

  onClear() {
    this.myForm.reset();
  }
}
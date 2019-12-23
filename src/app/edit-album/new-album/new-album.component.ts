import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AlbumsService } from 'src/app/services/albums.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss']
})
export class NewAlbumComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    'name': new FormControl("", [Validators.required, Validators.minLength(1)])

  });
  constructor(public dialogRef: MatDialogRef<NewAlbumComponent>, private albService: AlbumsService, private ns: NotificationService) { }

  ngOnInit() {
  
    this.albService.subjOnCreateAbum.subscribe(res => {
      if (res === "success") {
        this.ns.success(":: Album is created");
      } else {
        this.ns.notification(":: An error has occurred")

      }
    });
  }

  onClose(arr?: string) {
    this.myForm.reset();
    this.dialogRef.close(arr);
  }

  onSubmit() {
    const alb = this.myForm.controls['name'].value;
    this.albService.createAlbum(alb);
    this.onClose(alb);
  }

  onClear() {
    this.myForm.reset();

  }


}

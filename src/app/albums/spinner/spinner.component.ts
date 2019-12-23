import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SpinnerComponent>,) { }

  ngOnInit() {

  //  this.dialogRef.addPanelClass('testClass');
  }

}

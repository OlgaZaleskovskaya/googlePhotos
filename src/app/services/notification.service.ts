import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig }from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  
  }

  success(msg){
    this.config['panelClass'] = [ 'success'];
    this.snackBar.open(msg, '', this.config);
  }
  notification(msg){
    this.config['panelClass'] = ['notification'];
    this.snackBar.open(msg, '', this.config);
  }
}

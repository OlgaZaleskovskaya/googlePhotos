import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.component.html',
  styleUrls: ['./tempo.component.scss']
})
export class TempoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
   this.router.navigate([{ outlets: { editAlbum: ['edit'] }}]);
  }

}

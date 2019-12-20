import { Component, OnInit, Input } from '@angular/core';
import { IContentOptions } from 'src/app/shared/model';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],

})
export class ToolTipComponent implements OnInit {
  photoInfo: Object;
  options: IContentOptions;
  constructor() { }

  ngOnInit() {
    console.log('options', this.options.class)

  }

}

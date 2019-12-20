import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album/album.component';
import { AlbumDetailResolverService } from './album-detail-resolver-service';
import { ToolTipComponent } from './toolTip/tool-tip/tool-tip.component';
import { ToolTipDirective } from './toolTip/toolTip.directive';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { FilterPipe } from './filter.pipe';
import { PhotoComponent } from './photo/photo.component';
import { AlbumService } from './album.service';


@NgModule({
  declarations: [AlbumComponent, ToolTipDirective, ToolTipComponent, FilterPipe, PhotoComponent],
  exports: [AlbumComponent,
    PhotoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    AlbumRoutingModule
  ],
  entryComponents: [ToolTipComponent],
  providers: [AlbumDetailResolverService, AlbumService]
})
export class AlbumModule { }

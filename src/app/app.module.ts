import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumsService } from './services/albums.service';
import { InitialComponent } from './initial/initial.component';
import { AlbumsComponent } from './albums/albums.component';
import { AuthService } from './services/auth.service';
import { DatePipe } from '@angular/common';
import { HttpService } from './services/http.service';
import { EditAlbumModule } from './edit-album/edit-album.module';
import { TempoComponent } from './tempo/tempo.component';
import { MaterialModule } from './shared/material/material.module';
import { TestComponent } from './test/test.component';






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent,
    InitialComponent,
    AlbumsComponent,
    TempoComponent,
    TestComponent,
   
   
  ],
  imports: [
    BrowserModule,
    EditAlbumModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [AlbumsService, AuthService, DatePipe, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

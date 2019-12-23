import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material  from '@angular/material';



@NgModule({
  declarations: [],  
  imports: [
    CommonModule,
    Material.MatSliderModule,
    Material.MatCardModule,
    Material.MatTabsModule, 
    Material.MatButtonModule,
    Material.MatButtonToggleModule,
    Material.MatTooltipModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatGridListModule,
    Material.MatDialogModule,
    Material.MatToolbarModule,
    Material.MatSnackBarModule,
    Material.MatProgressSpinnerModule

  
  ],
  exports: [
    Material.MatSliderModule,
    Material.MatCardModule,
    Material.MatTabsModule, 
    Material.MatButtonModule,
    Material.MatButtonToggleModule,
    Material.MatTooltipModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatGridListModule,
    Material.MatDialogModule,
    Material.MatToolbarModule,
    Material.MatSnackBarModule,
    Material.MatProgressSpinnerModule
   
  ]
})
export class MaterialModule { }

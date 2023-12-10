import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HandtrackerComponent } from './handtracker.component';



@NgModule({
  declarations: [
    HandtrackerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HandtrackerComponent
  ]
})
export class HandtrackerModule { }

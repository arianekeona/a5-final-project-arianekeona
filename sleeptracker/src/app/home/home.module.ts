import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { HandtrackerModule } from '../handtracker/handtracker.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    HandtrackerModule
  ],
    declarations: [HomePage]
})
export class HomePageModule {}

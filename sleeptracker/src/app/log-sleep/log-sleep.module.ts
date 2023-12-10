import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogSleepPage } from './log-sleep.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LogSleepPageRoutingModule } from './log-sleep-routing.module';
import { HandtrackerModule } from '../handtracker/handtracker.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    LogSleepPageRoutingModule,
    HandtrackerModule
  ],
  declarations: [LogSleepPage]
})
export class LogSleepPageModule {}

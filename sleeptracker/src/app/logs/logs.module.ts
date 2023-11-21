import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogsPage } from './logs.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LogsPageRoutingModule } from './logs-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    LogsPageRoutingModule
  ],
  declarations: [LogsPage]
})
export class LogsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AnalyticsPage } from './analytics.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AnalyticsPageRoutingModule } from './analytics-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    AnalyticsPageRoutingModule
  ],
  declarations: [AnalyticsPage]
})
export class AnalyticsPageModule {}

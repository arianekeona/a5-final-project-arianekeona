import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { LogSleepPage } from '../log-sleep/log-sleep.page';
import { LogSleepinessPage } from '../log-sleepiness/log-sleepiness.page';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
  providers: [LogSleepPage, LogSleepinessPage]
})
export class LogsPage implements OnInit {
  showSleepData = true;
  showSleepinessData = false;
  dataValue = "sleep";

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
  }

  get getSleepData() {
    return SleepService.AllOvernightData;
  }

  get getSleepinessData() {
    return SleepService.AllSleepinessData;
  }

  changeSegment(value:string) {
    if (value == 'sleep') {
      this.showSleepData = true;
      this.showSleepinessData = false;
    } else if (value == 'sleepiness') {
      this.showSleepData = false;
      this.showSleepinessData = true;
    }
  }

}

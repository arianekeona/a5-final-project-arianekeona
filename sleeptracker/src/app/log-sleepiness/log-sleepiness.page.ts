import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})
export class LogSleepinessPage implements OnInit {
  sleepinessValue = 0;
  showDatePicker = false;
  dateValue:any;
  formattedDate = "MM/DD/YYYY, HH:MM";
  sleepinessData = new StanfordSleepinessData(0, new Date());
  showSleepinessData = false;

  constructor() { }

  ngOnInit() {
  }

  dateChanged(value:any) {
    this.dateValue = new Date(value);
    this.formattedDate = this.dateValue.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    this.showDatePicker = false;
  }

  storeSleepinessData() {
    if (this.dateValue instanceof Date && this.sleepinessValue != 0) {
      this.sleepinessData = new StanfordSleepinessData(this.sleepinessValue, this.dateValue);
      this.showSleepinessData = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
})
export class LogSleepPage implements OnInit {
  showStartPicker = false;
  startDateValue:any;
  formattedStartValue = "Select the time";
  showEndPicker = false;
  endDateValue:any;
  formattedEndValue = "Select the time";
  sleepData= new OvernightSleepData(new Date(), new Date());
  showSleepData = false;
  
  constructor() { }

  ngOnInit() {
  }

  startDateChanged(value:any) {
    this.startDateValue = new Date(value);
    this.formattedStartValue = this.startDateValue.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    this.showStartPicker = false;
  }

  endDateChanged(value:any) {
    this.endDateValue = new Date(value);
    this.formattedEndValue = this.endDateValue.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    this.showEndPicker = false;
  }

  storeSleepData() {
    if (this.startDateValue instanceof Date && this.endDateValue instanceof Date) {
      this.sleepData = new OvernightSleepData(this.startDateValue, this.endDateValue);
      this.showSleepData = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { NavController } from '@ionic/angular';
import { AppStorageService } from '../services/app-storage.service';

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

  showNewSleep = false;

  keyValue = "";
  public static allSleepData:any[];
  
  constructor(public sleepService:SleepService, private navCtrl:NavController, public appStorageService:AppStorageService) { }

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

  async storeSleepData() {
    if (this.startDateValue instanceof Date && this.endDateValue instanceof Date) {
      this.sleepData = new OvernightSleepData(this.startDateValue, this.endDateValue); //Value to be stored in storage
      this.keyValue = "sleep-" + this.sleepData.id; //Key to be stored in storage
      this.setValue(this.keyValue, this.sleepData);

      this.sleepService.logOvernightData(this.sleepData); //
      this.showSleepData = true;
      this.showNewSleep = true;
      this.getSleepKeys();
    }
  }

  restartLogSleep() {
    this.showSleepData = false;
    this.showNewSleep = false;
    this.startDateValue = new Date();
    this.endDateValue = new Date();
    this.formattedStartValue = "Select the time";
    this.formattedEndValue = "Select the time";
    this.navCtrl.navigateForward('/log-sleep');
  }

  async setValue(key:string, value:any) {
    await this.appStorageService.set(key, value);
  }

  async getValue(key:string){
    let value = await this.appStorageService.get(key);
    return value;
  }

  async getSleepKeys() {
    let keys = await this.appStorageService.keys();
    let sleepKeys = keys?.filter(k => k.startsWith('sleep-'));
    
    let promises = sleepKeys?.map(async (k) => {
      let val = await this.getValue(k);
      return val;
    });

    LogSleepPage.allSleepData = await Promise.all(promises!);
    return sleepKeys;
  }
    
}

import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { NavController } from '@ionic/angular';
import { AppStorageService } from '../services/app-storage.service';


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

  showNewSleepiness = false;

  keyValue = "";
  public static allSleepinessData:any[];

  constructor(public sleepService:SleepService, private navCtrl:NavController, public appStorageService:AppStorageService) { }

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
      this.sleepinessData = new StanfordSleepinessData(this.sleepinessValue, this.dateValue); //Value stored in storage
      this.keyValue = "sleepiness-" + this.sleepinessData.id; //Key stored in storage
      this.setValue(this.keyValue, this.sleepinessData);

      this.sleepService.logSleepinessData(this.sleepinessData);
      this.showSleepinessData = true;
      this.showNewSleepiness = true;
      this.getSleepinessKeys();
    }
  }

  restartLogSleepiness() {
    this.showSleepinessData = false;
    this.showNewSleepiness = false;
    this.sleepinessValue = 0;
    this.dateValue = new Date();
    this.formattedDate = "MM/DD/YYYY, HH:MM";
    this.navCtrl.navigateForward('/log-sleepiness');
  }

  async setValue(key:string, value:any) {
    await this.appStorageService.set(key, value);
  }

  async getValue(key:string){
    let value = await this.appStorageService.get(key);
    return value;
  }

  async getSleepinessKeys() {
    let keys = await this.appStorageService.keys();
    let sleepKeys = keys?.filter(k => k.startsWith('sleepiness-'));
    
    let promises = sleepKeys?.map(async (k) => {
      let val = await this.getValue(k);
      return val;
    });

    LogSleepinessPage.allSleepinessData = await Promise.all(promises!);
    return sleepKeys;
  }
}

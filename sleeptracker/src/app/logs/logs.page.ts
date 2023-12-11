import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { LogSleepPage } from '../log-sleep/log-sleep.page';
import { LogSleepinessPage } from '../log-sleepiness/log-sleepiness.page';
import { AppStorageService } from '../services/app-storage.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { HomePage } from '../home/home.page';

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

  constructor(public sleepService:SleepService, public appStorageService:AppStorageService) { 
    this.getSleepKeys();
    this.getSleepinessKeys();
  }

  ngOnInit() {
    HomePage.movedToLogs = false;
  }

  async getValue(key:string){
    let value = await this.appStorageService.get(key);
    return value;
  }

  //Retrieve sleep data using storage.keys()
  async getSleepKeys() {
    let keys = await this.appStorageService.keys();
    let sleepKeys = keys?.filter(k => k.startsWith('sleep-'));
    
    let promises = sleepKeys?.map(async (k) => {
      let val = await this.getValue(k);
      return val;
    });

    LogSleepPage.allSleepData = await Promise.all(promises!);
    this.sortSleepData(LogSleepPage.allSleepData);
    return sleepKeys;
  }

  //Retrieve sleepiness data using storage.keys()
  async getSleepinessKeys() {
    let keys = await this.appStorageService.keys();
    let sleepKeys = keys?.filter(k => k.startsWith('sleepiness-'));
    
    let promises = sleepKeys?.map(async (k) => {
      let val = await this.getValue(k);
      return val;
    });

    LogSleepinessPage.allSleepinessData = await Promise.all(promises!);
    this.sortSleepData(LogSleepinessPage.allSleepinessData);
    return sleepKeys;
  }

  sortSleepData(arr:any[]) {
    arr.sort(function(a, b){return b.loggedAt - a.loggedAt});
  }

  get getSleepData() {
    return LogSleepPage.allSleepData;
  }

  get getSleepinessData() {
    return LogSleepinessPage.allSleepinessData;
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

  //Access summaryString() from OvernightSleepData
  getSleepSummaryString(data:any) {
    let slD = new OvernightSleepData(data.sleepStart, data.sleepEnd);
    return slD.summaryString();
  }

  //Access displayTimeSlept() from OvernightSleepData
  getTimeSlept(data:any) {
    let slD = new OvernightSleepData(data.sleepStart, data.sleepEnd);
    return slD.displayTimeSlept();
  }

  //Access displayLongSleepStart() from OvernightSleepData
  getLongSleepStart(data:any) {
    let slD = new OvernightSleepData(data.sleepStart, data.sleepEnd);
    return slD.displayLongSleepStart();
  }

  //Access displayLongSleepEnd() from OvernightSleepData
  getLongSleepEnd(data:any) {
    let slD = new OvernightSleepData(data.sleepStart, data.sleepEnd);
    return slD.displayLongSleepEnd();
  }

  //Access summaryString() from StanfordSleepinessData
  getSleepinessSummaryString(data:any) {
    let slsD = new StanfordSleepinessData(data.loggedValue, data.loggedAt);
    return slsD.summaryString();
  }

  //Access displaySleepinessLevel() from StanfordSleepinessData
  getSleepinessLevel(data:any) {
    let slsD = new StanfordSleepinessData(data.loggedValue, data.loggedAt);
    return slsD.displaySleepinessLevel();
  }

  //Access displayTimeLogged() from StanfordSleepinessData
  getTimeLogged(data:any) {
    let slsD = new StanfordSleepinessData(data.loggedValue, data.loggedAt);
    return slsD.displayTimeLogged();
  }
}

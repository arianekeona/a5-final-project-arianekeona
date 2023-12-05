import { Component, OnInit } from '@angular/core';
import { LogSleepPage } from '../log-sleep/log-sleep.page';
import { LogSleepinessPage } from '../log-sleepiness/log-sleepiness.page';
import { SleepService } from '../services/sleep.service';
import { AppStorageService } from '../services/app-storage.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  providers: [LogSleepPage, LogSleepinessPage]
})
export class AnalyticsPage implements OnInit {
  public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7
  
  public static avgHours = 0;
  public static avgMinutes = 0;
  public static avgSleepinessLvl = 0;
  public static formattedSleepinessLvl = "";

  constructor(public sleepService:SleepService, public appStorageService:AppStorageService) { 
    this.getSleepKeys();
    this.getSleepinessKeys();
  }

  ngOnInit() {
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
    this.getAvgSleep(LogSleepPage.allSleepData);
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
    this.getAvgSleepiness(LogSleepinessPage.allSleepinessData);
    return sleepKeys;
  }

  getAvgSleep(sleepData:any[]) {
    AnalyticsPage.avgHours = 0;
    AnalyticsPage.avgMinutes = 0;
    for (let data of sleepData) {
      let slD = new OvernightSleepData(data.sleepStart, data.sleepEnd);
      slD.summaryString();
      AnalyticsPage.avgHours += slD.hours;
      AnalyticsPage.avgMinutes += slD.minutes;
    }
    AnalyticsPage.avgHours = Math.round(AnalyticsPage.avgHours / sleepData.length);
    AnalyticsPage.avgMinutes = Math.round(AnalyticsPage.avgMinutes / sleepData.length);
  }

  getAvgSleepiness(sleepinessData:any[]) {
    AnalyticsPage.avgSleepinessLvl = 0;
    for (let data of sleepinessData) {
      let slsD = new StanfordSleepinessData(data.loggedValue, data.loggedAt);
      AnalyticsPage.avgSleepinessLvl += Number(slsD.loggedValue);
    }
    AnalyticsPage.avgSleepinessLvl = Math.round(AnalyticsPage.avgSleepinessLvl / sleepinessData.length);
    AnalyticsPage.formattedSleepinessLvl = AnalyticsPage.avgSleepinessLvl + ": " + StanfordSleepinessData.ScaleValues[AnalyticsPage.avgSleepinessLvl];
  }

  get getAvgHours() {
    return AnalyticsPage.avgHours;
  }

  get getAvgMinutes() {
    return AnalyticsPage.avgMinutes;
  }

  get getFmtedSleepinessLvl() {
    return AnalyticsPage.formattedSleepinessLvl;
  }
}

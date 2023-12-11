import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import * as handTrack from 'handtrackjs';
import { NavController } from '@ionic/angular';
import { PredictionEvent } from '../prediction-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	gesture: String = "";
	currentTime = "0:00AM";

	public static movedToLogSleep = false;
	public static movedToLogSleepiness = false;
	public static movedToLogs = false;
	public static movedToAnalytics = false;

	navToPage = false;
	logData = false;
	
  constructor(public sleepService:SleepService, private navCtrl:NavController, private router:Router) {
	}

	ngOnInit() {
		document.addEventListener("DOMContentLoaded", this.updateTime);
		setInterval(this.updateTime, 1000);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	updateTime() {
		let today = new Date();
		let hours = today.getHours();
		let minutes = today.getMinutes();

		let hour = hours < 10 ? +("0" + hours) : hours;
		let minute = minutes < 10 ? "0" + minutes : minutes;

		let hour_time = hour > 12 ? hour - 12 : hour;

		let am_or_pm = hour < 12 ? "AM" : "PM";

		this.currentTime = hour_time + ":" + minute + am_or_pm;

		let e = document.getElementById("current-time") as HTMLElement | null;
		if (e !== null)
			e.innerHTML = this.currentTime;
	}

	navLogSleep() {
		this.navCtrl.navigateForward('/log-sleep');
	}

	navLogSleepiness() {
		this.navCtrl.navigateForward('/log-sleepiness');
	}

	switchToPage() {
		this.navToPage = true;
		this.logData = false;
	}

	switchToData() {
		this.navToPage = false;
		this.logData = true;
	}

	navToPagePrediction(event: PredictionEvent) {
		this.gesture = event.getPrediction();
		if (this.gesture == 'One Open Hand and One Closed Hand') {
			HomePage.movedToLogs = true;
			this.router.navigate(['/tabs/logs'])
		} else if (this.gesture == 'One Open Hand and One Pointing Hand') {
			HomePage.movedToAnalytics = true;
			this.router.navigate(['/tabs/analytics'])
		}
	}

	sleepDataPrediction(event: PredictionEvent){
		this.gesture = event.getPrediction();
		if (this.gesture == 'Open Hand') {
			HomePage.movedToLogSleep = true;
			this.navLogSleep();
		} else if (this.gesture == 'Closed Hand') {
			HomePage.movedToLogSleepiness = true;
			this.navLogSleepiness();
		}
	}

}

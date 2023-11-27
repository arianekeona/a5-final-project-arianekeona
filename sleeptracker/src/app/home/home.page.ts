import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentTime = "";
	
  constructor(public sleepService:SleepService) {
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
}

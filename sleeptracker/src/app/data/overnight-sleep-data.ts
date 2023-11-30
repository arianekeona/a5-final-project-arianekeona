import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		var hours = Math.floor(difference_ms / (1000*60*60));
		var minutes = Math.floor(difference_ms / (1000*60) % 60);

		if (minutes > 1) {
			return hours + " hours, " + minutes + " minutes";
		} else if (minutes == 1) {
			return hours + " hours, " + minutes + " minute";
		} else {
			return hours + " hours, " + minutes + " minutes";
		}
		
	}

	override dateString():string {
		return "night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	displayLongSleepStart():string {
		return this.sleepStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }) + " on " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	displayLongSleepEnd():string {
		return this.sleepEnd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }) + " on " + this.sleepEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	displayTimeSlept():string {
		return this.sleepStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }) + " to " + this.sleepEnd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
	}
}

class Time {
    constructor(hour, minute) {
        this.hour = hour;
        this.minutes = minute;
        this.timeSelectors = [];
    }
    getCurrentHour() {
        if (this.hour > 12) {
            return this.hour - 12;
        }
        return this.hour;
    }
    getCurrentMinutes(time) {
        if (this.minutes > 30) {
            return 60 - this.minutes;
        }
        return this.minutes;
    }
    isToSix() {
        return (this.minutes >= 0) && (this.minutes <= 30);
    }
    isAfterSix() {
        return (this.minutes > 30) && (this.minutes <= 60);
    }


}
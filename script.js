class Time {
    constructor(hour, minute) {
        this.hour = hour;
        this.minutes = minute;
        this.timeSelectors = ['basic'];
    }
    getCurrentHour() {
        if (this.hour > 12) {
            return this.hour - 12;
        }
        return this.hour;
    }
    getCurrentMinutes() {
        // console.log(`minutes: ${this.minutes}`);
        this.minutes = Math.round(this.minutes / 5) * 5; //rounding in step 5
        // console.log(`rounded minutes: ${this.minutes}`);
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
    getTime() {
        var min = this.getCurrentMinutes();
        if (min == 0) {
            // console.log('min == 0');
            this.timeSelectors.push('oclock');
        } else {
            if (this.isToSix()) {
                // console.log('isToSix');
                this.timeSelectors.push('past');
            } else {
                // console.log('isAfterSix');
                this.timeSelectors.push('to');
                this.hour++;
            }
            if (min == 15) {
                this.timeSelectors.push('quarter');
            } else {
                this.timeSelectors.push(min + 'min');
            }
        }
        var hr = this.getCurrentHour();
        this.timeSelectors.push(hr + 'hour');
    }
    showTime() {
        for (let i = 0; i < this.timeSelectors.length; i++) {
            var elements = document.getElementsByClassName(this.timeSelectors[i]);
            for (let j = 0; j < elements.length; j++) {
                elements[j].classList.add('to-color');
            }
        }
    }
    deletePreviousTime() {
        for (let i = 0; i < this.timeSelectors.length; i++) {
            var elements = document.getElementsByClassName(this.timeSelectors[i]);
            console.log(this.timeSelectors[i]);
            for (let j = 0; j < elements.length; j++) {
                elements[j].classList.remove('to-color');
            }
        }
    }

}


function displayTimeToScreen(state) {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var example1 = new Time(hour, min);
    example1.deletePreviousTime();
    example1.getTime();
    example1.showTime();
    if (state) {
        var seconds = date.getSeconds();
        var secondsToWait = (60 - seconds) * 1000;
        setTimeout(function() { displayTimeToScreen() }, secondsToWait);
    } else {
        setTimeout(function() { displayTimeToScreen() }, 60000);
    }
    // console.log(example1.getCurrentHour());
    // console.log(example1.getCurrentMinutes());
}
displayTimeToScreen(true);
// var date = new Date();
// var hour = date.getHours();
// var min = date.getMinutes();
// var example1 = new Time(hour, min);
// example1.getTime();
// example1.showTime();
// console.log(example1.getCurrentHour());
// console.log(example1.getCurrentMinutes());
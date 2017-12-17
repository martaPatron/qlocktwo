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
    getCurrentMinutes() {
        this.minutes = Math.round(this.minutes / 5) * 5; //rounding in step 5
        if (this.minutes > 30 && this.minutes < 58) {
            return 60 - this.minutes;
        } else if (this.minutes > 57) {
            this.hour++;
            return 0;
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
        this.timeSelectors.push('basic');
        if (min == 0) {
            this.timeSelectors.push('oclock');
        } else {
            if (this.isToSix()) {
                this.timeSelectors.push('past');
            } else {
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
        if (hr == 0) { hr = 12; }
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
}

function deletePreviousTime() {
    var elements = document.getElementsByClassName('to-color');
    var n = document.getElementsByClassName('to-color').length;
    for (let j = 0; j < n; j++) {
        elements[0].classList.remove('to-color');
    }
}

function displayTimeToScreen(state) {
    var date = new Date();
    if (arguments.length > 2) {
        date.setHours(arguments[1]);
        date.setMinutes(arguments[2]);
    }
    var hour = date.getHours();
    var min = date.getMinutes();
    var timeClock = new Time(hour, min);
    deletePreviousTime();
    timeClock.getTime();
    timeClock.showTime();
    if (arguments.length > 2) {
        return;
    }
    if (state) {
        var seconds = date.getSeconds();
        var secondsToWait = (60 - seconds) * 1000;
        timer = setTimeout(function() { displayTimeToScreen() }, secondsToWait);
    } else {
        setTimeout(function() { displayTimeToScreen() }, 60000);
    }
}
displayTimeToScreen(true);

var currentTimeBtn = document.getElementsByClassName('current-time')[0];
var specifiedTimeBtn = document.getElementsByClassName('specified-time')[0];
currentTimeBtn.addEventListener('click', showCurrentTime);
specifiedTimeBtn.addEventListener('click', showSpecifiedTime);

function showCurrentTime() {
    document.getElementById('inputTime').value = "";
    displayTimeToScreen(true);
}

function showSpecifiedTime() {
    var timeInput = document.getElementById('inputTime');
    var timeValue = timeInput.value;
    if (timeValue != "") {
        var hour = +(timeValue.slice(0, 2)); //it gets hours from input
        var min = +(timeValue.slice(3, timeValue.length)); //it gets minutes from input
        clearTimeout(timer);
        displayTimeToScreen(false, hour, min);
    } else alert('Enter valid time');
}
const $ = document;

let time = 0;
let flag = false;
let prevTime = 0;

const clock = $.getElementById('clock')
const history = $.getElementById('history')
const actionReset = $.getElementById('reset')
const actionStart = $.getElementById('start')
const actionStop = $.getElementById('stop')

const convertedTimeToString = (time) => {
    time += '';
    return '00'.substring(0, 2 - time.length) + time;
}

const convertTime = (time) => {
    const milisecond = time % 100;
    const second = Math.floor(time / 100) % 60;
    const minute = Math.floor(time / 100 / 60) % 60;

    return {
        milisecond: convertedTimeToString(milisecond),
        second: convertedTimeToString(second),
        minute: convertedTimeToString(minute),
    }
}

const showTime = () => {
    clock.innerHTML = `
    <span>${convertTime(time).minute}</span>
    <span>:</span>   
    <span>${convertTime(time).second}</span>
    <span>:</span>   
    <span>${convertTime(time).milisecond}</span>
    `
}

const showHistory = (e) => {
    if (prevTime !== e) {
        history.innerHTML += `
        <div>
        <span>${convertTime(e).minute}</span>
        <span>:</span>   
        <span>${convertTime(e).second}</span>
        <span>:</span>   
        <span>${convertTime(e).milisecond}</span>
        </div>
        `
        prevTime = e;
    }

}

const clearHistory = () => {
    history.innerHTML = '';
}

const action = () => {
    const myInterval = setInterval(() => {
        if (flag)
            clearInterval(myInterval);
        else {
            time += 1;
            showTime();
        }
    }, 10);
}

const handleStart = () => {
    flag = false;
    action();
}

const handleStop = () => {
    flag = true;
    action();
    showHistory(time);
};

const handleReset = () => {
    flag = true;
    action();
    clearHistory();
    time = 0;
    showTime();
}


actionReset.onclick = () => { handleReset() };
actionStart.onclick = () => { handleStart() };
actionStop.onclick = () => { handleStop() };
showTime();
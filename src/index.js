const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const generateCalendar = _ => {
    // remove any previously generated elements
    document.querySelectorAll(".calendar").forEach(node => node.remove());
    document.querySelectorAll("h1").forEach(node => node.remove());
    // and then make the new
    let year = Number.parseInt(document.querySelector('#year').value);
    let month = Number.parseInt(document.querySelector('#month').value);
    console.log(`generating Calendar for ${year} and ${month}`);
    for (let index = 0; index < 12; index++) {
        makeMonth(month, year);
        if (month === 11) {
            year = year + 1;
        }
        month = (month+1) % 12;
    }
}

const makeMonth = (month, year) => {
    console.log(`Making ${month}.${year}`);
    const first = firstDay(year, month);
    const last = lastDay(year, month);
    const heading = makeHeading(first);
    const calendar = makeCalendar();
    let running = new Date(first);
    let emptyNeeded = first.getDay() === 0 ? 6 : first.getDay() -1;
    let dayCount = 1;
    for (let index = 0; index < emptyNeeded; index++) {
        const empty = makeEmpty(running);
        calendar.appendChild(empty);
        dayCount ++;
    }
    while (running.getDate() < last.getDate()) {
        const day = makeDay(running, dayCount);
        calendar.appendChild(day);
        running.setDate(running.getDate() + 1);
        dayCount++;
    }
    const day = makeDay(last);
    calendar.appendChild(day);
    document.body.appendChild(heading);
    document.body.appendChild(calendar);
}

const makeCalendar = _ => {
    const el = document.createElement('div');
    el.classList.add('calendar');
    return el;
}

const makeEmpty = _ => {
    const el = document.createElement('div');
    el.classList.add('empty');
    return el;
}

const makeHeading = (date) => {
    const el = document.createElement('h1');
    el.innerText = months[date.getMonth()];
    return el;
}

const makeDay = (date, dayCount) => {
    const number = date.getDate();
    const wd = weekdays[date.getDay()];
    const day = document.createElement('div');
    day.classList.add('day');
    if (dayCount <= 7) {
        day.classList.add('top');
    }
    const weekday = document.createElement('div');
    weekday.classList.add('weekday');
    weekday.innerText = wd;
    day.appendChild(weekday);
    const dayNumber = document.createElement('h2');
    dayNumber.innerText = number;
    day.appendChild(dayNumber);
    return day;
}

const firstDay = (year, month) => {
    return new Date(year, month, 1);
}

const lastDay = (year, month) => {
    return new Date(year, month+1, 0);
}

const populateYears = _ => {
    let date = new Date();
    const select = document.querySelector("#year");
    for (let index = 0; index < 10; index++) {
        const option = document.createElement("option");
        option.setAttribute("value", date.getFullYear());
        option.innerText = date.getFullYear();
        select.appendChild(option);
        date.setFullYear(date.getFullYear() + 1);
    }
}

document.querySelector('#generate').addEventListener('click', generateCalendar);
window.addEventListener('load', populateYears);
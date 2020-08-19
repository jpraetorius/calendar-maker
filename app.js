const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const generateCalendar = _ => {
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
    for (let index = 0; index < emptyNeeded; index++) {
        const empty = makeEmpty(running);
        calendar.appendChild(empty);
    }
    while (running.getDate() < last.getDate()) {
        const day = makeDay(running);
        calendar.appendChild(day);
        running.setDate(running.getDate() + 1);
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

const makeDay = (date) => {
    const number = date.getDate();
    const wd = weekdays[date.getDay()];
    const day = document.createElement('div');
    day.classList.add('day')
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

document.querySelector('#generate').addEventListener('click', generateCalendar);


// <h1>September</h1>
//     <div class="calendar">
//         <div class="empty">
//         </div>
//         <div class="day first top">
//             <span class="weekday">T</span>
//             <h2>2</h2>
//         </div>
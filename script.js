/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
$(document).ready(() => {
  const currentDay = moment().format('dddd, LL');
  $('#currentDay').text(currentDay);

  function getscheduleKey() {
    const currentDay2 = moment().format('YYYY-MM-DD');
    return `${currentDay2}-schedule`;
  }

  for (let i = 0; i < 9; i++) {
    const dateTime = moment(`${moment().format('YYYY-MM-DD')} 09:00:00`).add(i, 'hour');
    const timeHour = dateTime.format('h A');
    const RowDiv = $('<div>');
    RowDiv.appendTo('.container');
    RowDiv.addClass('row');

    const timehour2 = timeHour.replace(' ', '-');
    const hourDiv = $('<div>');
    hourDiv.appendTo(RowDiv);
    hourDiv.addClass('col-1 hour p-2');
    hourDiv.text(timeHour);
    hourDiv.attr('id', timehour2);

    const textDiv = $('<div>');
    textDiv.addClass('col-10 input-group p-0');
    textDiv.appendTo(RowDiv);

    const textBox = $('<textarea>');
    textBox.appendTo(textDiv);
    textBox.addClass('textarea-input col-12 ');
    textBox.attr('id', `${timehour2}-details`);

    const buttonDiv = $('<div>');
    buttonDiv.addClass('col-1 p-0');
    buttonDiv.appendTo(RowDiv);

    const buttonArea = $('<button>');
    buttonArea.appendTo(buttonDiv);
    buttonArea.addClass('btn btn-info btn-outline-secondary saveBtn ');
    buttonArea.attr('id', `${timehour2}-save`);

    const iTag = $('<i>');
    buttonArea.append(iTag);
    iTag.addClass('fas fa-save');

    const timeHourIn24hr = parseInt(dateTime.format('H'), 10);
    const currentHour = parseInt(moment().format('H'), 10);
    if (timeHourIn24hr === currentHour) {
      textBox.addClass('present');
    } else if (timeHourIn24hr < (currentHour)) {
      textBox.addClass('past');
      textBox.attr('disabled', true);
    } else if (timeHourIn24hr > currentHour) {
      textBox.addClass('future');
    }
  }

  let scheduleData = JSON.parse(localStorage.getItem(getscheduleKey()));
  if (scheduleData == null) {
    scheduleData = {};
  }

  for (const key in scheduleData) {
    const activity = scheduleData[key];
    $(`#${generateActivityId(key)}`).val(activity);
  }

  $('.saveBtn').click((e) => {
    const btnId = e.currentTarget.id;
    const inputId = btnId.replace('save', 'details');
    const textval = $(`#${inputId}`).val();
    const hourId = btnId.replace('-save', '');

    let scheduleDataLS = localStorage.getItem(getscheduleKey());
    if (scheduleDataLS == null) {
      scheduleDataLS = {};
    } else {
      scheduleDataLS = JSON.parse(scheduleDataLS);
    }

    if (textval !== '') {
      scheduleDataLS[hourId] = textval;
      localStorage.setItem(getscheduleKey(), JSON.stringify(scheduleDataLS));
    } else if (textval === '') {
      if (scheduleDataLS[hourId]) {
        delete scheduleDataLS[hourId];
        localStorage.setItem(getscheduleKey(), JSON.stringify(scheduleDataLS));
      }
    }
  });
});

function generateActivityId(hourId) {
  return `${hourId}-details`;
}

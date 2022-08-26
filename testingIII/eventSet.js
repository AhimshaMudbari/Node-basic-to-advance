const { reminderSync } = require('./reminder');
const send = require('./reminder');

function setReminder(value) {
  const reminderFunction = reminderSync(value.id);
  if (reminderFunction.reminder == true) {
    console.log(reminderFunction.alarm());
    send.s(reminderFunction.date, 'message');
  }
}

module.exports.setReminder = setReminder;

const { reminderSync, send } = require('./reminder');

function setReminder(value) {
  const reminderFunction = reminderSync(value.id);
  if (reminderFunction.reminder == true) {
    console.log(reminderFunction.message);
    send(reminderFunction.date, 'message');
  }
}

module.exports.setReminder = setReminder;

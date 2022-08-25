function reminderSync(id) {
  console.log('Reminder started successfully');
  return {
    id: id,
    reminder: true,
    message: ' unset',
    alarm: function () {
      if (this.reminder == true) {
        return (this.message = 'set');
      }
    },
  };
}

function send(date, message) {
  console.log('sending function');
}

module.exports.reminderSync = reminderSync;
module.exports.send = send;

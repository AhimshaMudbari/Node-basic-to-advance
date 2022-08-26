function reminderSync(id) {
  console.log('Reminder started successfully');
  return {
    id: id,
    reminder: true,
    message: ' unset',
    alarm: function () {
      if (this.reminder == true) {
        return { message: 'set' };
      }
    },
  };
}

module.exports.s = function (date, message) {
  console.log('sending function');
};

module.exports.reminderSync = reminderSync;

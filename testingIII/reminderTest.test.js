const { setReminder } = require('./eventSet');
const { describe, expect } = require('@jest/globals');
const { reminderSync, send } = require('./reminder');

describe('Reminder test', () => {
  it('should set reminder and its set message', () => {
    reminderSync ==
      function (id) {
        return {
          id: id,
        };
      };
    let msg = 'unsuccess';
    send ===
      function (date, message) {
        date = new Date().getDate();
        msg = 'success';
        return date;
      };
    setReminder({ id: 1 });
    expect(msg).toBe('unsuccess');
  });
});

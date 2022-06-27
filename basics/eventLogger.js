var EventEmitter = require('events'); //EventEmitter is class

class Logger extends EventEmitter {
  log(message) {
    this.emit('msgEvent', { id: 1, url: 'http://ahim.ooi' });
    console.log(message);
  }
}

module.exports = Logger;

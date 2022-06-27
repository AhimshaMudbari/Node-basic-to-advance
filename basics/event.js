var EventEmitter = require('events'); //EventEmitter is class
// const logging = new EventEmitter();

// //Raising an event to call emit function ---( always first)
// emitter.addListener('Logg', (args) => {
//   console.log('Its working', args);
// });

// //on method and addListener method is a same thing
// emitter.on('Logg', () => {
//   console.log('message emitted');
// });

// emitter.emit('Logg', { id: 1, url: 'http://ahim.io' }); //event produce/declaring ---( always second )

// logging.on('logg', (msg) => {
//   console.log(msg);
// });

// logging.emit('logg', { msg: 'hi from here' });

const Logger = require('./eventLogger');
const logger = new Logger();
logger.on('msgEvent', (args) => {
  console.log('message emitted', args);
});

logger.log('event logger and event working fine');

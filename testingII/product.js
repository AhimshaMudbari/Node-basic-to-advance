const db = require('./db');
const notify = require('./notification');

function addTax(order) {
  const customer = db.getCustomerSync(order.cid);
  if (customer.foreignCustomer == true) {
    order.totalPrice *= 0.13;
  }
}
function mailCustomer(order) {
  const customer = db.getCustomerSync(order.customerId);

  notify.send(customer.email, 'order delivered successfuly..');
}

module.exports.addTax = addTax;
module.exports.mailCustomer = mailCustomer;

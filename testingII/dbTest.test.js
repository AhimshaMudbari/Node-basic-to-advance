const { addTax, mailCustomer } = require('./product');
const db = require('./db');
const notify = require('./notification');

describe('database product test', () => {
  it('should add a tax if customer is foreign', () => {
    db.getCustomerSync = function (customerId) {
      console.log('reafing from fake db...');
      return { id: customerId, foreignCustomer: true };
    };
    const order = { cid: 1, totalPrice: 1100 };
    addTax(order);
    expect(order.totalPrice).toBe(1100 * 0.13);
  });
});

describe('notification', () => {
  it('should send notification if order is delivered', () => {
    db.getCustomerSync ==
      function (customerId) {
        return { email: 'ahim@gmail.com' };
      };
    let mailsent = false;
    notify.send = function (email, message) {
      mailsent = true;
    };
    const obj = { customerId: 11 };
    mailCustomer(obj);
    expect(mailsent).toBe(true);
  });
});

module.exports.getCustomer = async function roduct(id) {
  return new Promise((resolve, reject) => {
    console.log('Fetching data from db...');
    resolve({ id: id, foreignCustomer: true });
  });
};

module.exports.getCustomerSync = function (id) {
  console.log('Fetching data from db...');
  return { id: id, foreignCustomer: true };
};

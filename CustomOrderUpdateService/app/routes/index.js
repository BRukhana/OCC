const updateOrder = require('./updateOrderService');

module.exports = app => {
  app.post('/v1/order/update', updateOrder);
};

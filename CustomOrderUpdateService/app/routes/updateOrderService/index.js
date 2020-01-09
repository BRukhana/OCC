const logger = require('../../logger');
const UpdateOrderConnector = require('../../api/update-order/UpdateOrderConnector');
const { validateRequiredFields } = require('./request');
const { getOrderUpdateSettings, extractOccEnvironment } = require('../../api/update-order/environmentSettings');
const { missingRequiredInformationError, unableToProcessError, successResponse } = require('./response');

async function orderUpdateRouteHandler(req, res) {
  const payload = req.body;
  const isValidPayload = validateRequiredFields(payload.messageDetails);
  const orderId = payload.id
  if(!orderId) {
    logger.debug(`[orderUpdateRouteHandler] Missing required info. Sending back HTTP 400`);
    res.status(400).json(missingRequiredInformationError());
    return;
  }
    logger.debug(`[orderUpdateRouteHandler] Creating new order update connector`);
    let connector = new UpdateOrderConnector(getOrderUpdateSettings(extractOccEnvironment(req.get('host')))); 
    
  try{
    const validationResponse = await connector.updateInvoicePaymentOrder(orderId);
    logger.debug(
      `[orderUpdateRouteHandler] Sending back HTTP 200: ${JSON.stringify(
        validationResponse,
        null,
        2
      )}`
    );
    res.status(200).json(successResponse(validationResponse));
  }catch (e) {
    logger.debug(`[orderUpdateRouteHandler] Got an error while updating order. Sending back HTTP 400`);
    res.status(400).json(unableToProcessError(e));
  }
}

module.exports = orderUpdateRouteHandler;
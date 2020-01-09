const request = require('request-promise-native');
const logger = require('../../logger');
const querystring = require("querystring");

class UpdateOrderConnector {
  constructor(options) {
    this.host_name = options.admin_url;
    this.api_key = options.api_key;
  }

  async updateInvoicePaymentOrder(orderId) {
    const token = await this.retrieveToken();
    try {

      var orderPayLoad = {
        "state" : "PENDING_APPROVAL" 
      }

      const updateOrder = await request({
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        url:`${this.host_name}/ccadmin/v1/orders/${orderId}` ,
        body: orderPayLoad,
        method: 'PUT',
        json: true
      });
      logger.debug(
        ` [updateInvoicePaymentOrder] Sending back HTTP 200: ${JSON.stringify(updateOrder,
          null,
          2
        )}`);

      return updateOrder;
    } catch (e) {
      logger.debug(`Cannot update order :  ${e}`);
      throw e;
    }
  }

  /*
  This method would return access token based on the requesting enviroment .

  */
  async retrieveToken(){
    
    let  loginResponse;
    try{
      loginResponse = await request({
      headers: {
        Authorization: `Bearer ${this.api_key}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: `${this.host_name}/ccadminui/v1/login`,
      method: 'POST',
      body: querystring.stringify({ grant_type: 'client_credentials' }),
      json: true
    });
  } catch (e) {
    logger.debug(`Cannot get credentials. ${e}`);
    throw e;
  }
  return loginResponse.access_token;
  }
}

module.exports = UpdateOrderConnector;

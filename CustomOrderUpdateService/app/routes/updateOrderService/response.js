function errorResponse(code, message) {
  return {
    success: false,
    code,
    message
  };
}

function missingRequiredInformationError() {
  return errorResponse(2, 'Missing required information [order id is mandatory in payload]');
}

function unableToProcessError(res) {
  return errorResponse(1,res.message.replace(/(\r\n|\\n|\r|"|-|\\)/gm, '') );
}

function successResponse() {
  return {
    success: true,
  };
}

module.exports = {
  missingRequiredInformationError,
  unableToProcessError,
  successResponse
};

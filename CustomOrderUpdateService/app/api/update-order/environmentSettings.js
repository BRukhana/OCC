const environmentSettings = {
  prod: {
    admin_url :'<prod_env_url>',
    api_key: '<API_KEY>'
  },
  sandbox: {
    admin_url :'<test_env_url>',
    api_key: '<API_KEY>'
  }
};

const environmentsMapping = {
  prod: 'prod',
  'localhost' :'sandbox',
  '<stage_env_host_name>':'sandobx',
  '<test_env_host_name>': 'sandbox'
};

function getOrderUpdateSettings(occEnvironment) {
  return environmentSettings[environmentsMapping[occEnvironment]];
}

function extractOccEnvironment(origin) {
  const regex = /(.*)\.(oracle|localhost)/;
  const match = regex.exec(origin);

  if (match && match[1]) {
    return match[1];
  }

  return '';
}

module.exports = { getOrderUpdateSettings, extractOccEnvironment };

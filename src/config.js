import fetch from 'isomorphic-fetch';

const requiredKeys = [{
  key: 'googleSheetId',
  message: 'Configuration missing: Google Spreadsheet ID!'
}, {
  key: 'formId',
  message: 'Configuration missing: Ask form ID!'
}, {
  key: 'formScript',
  message: 'Configuration missing: Ask form embed JavaScript URL!'
}, {
  key: 'jsonURI',
  message: 'Configuration missing: JSON output URI!'
}];

export default fetch('./config.json')
  .then(response => response.json())
  .catch(() => {
    // Handle all errors the same way
    throw new Error([
      'No config.json file detected or file could not be parsed.',
      'Ensure that config.json is in the same directory as index.html'
    ].join('\n'));
  })
  .then((config) => {
    requiredKeys.forEach((requiredKey) => {
      if (!config[requiredKey.key]) {
        throw new Error(requiredKey.message);
      }
    });
    return config;
  });

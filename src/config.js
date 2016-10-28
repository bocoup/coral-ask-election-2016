import config from '../config.json';

[{
  key: 'googleSheetId',
  message: 'Configuration missing: Google Spreadsheet ID!'
}, {
  key: 'formId',
  message: 'Configuration missing: Ask form ID!'
}, {
  key: 'jsonURI',
  message: 'Configuration missing: JSON output URI!'
}].forEach((requiredKey) => {
  if (!config[requiredKey.key]) {
    throw new Error(requiredKey.message);
  }
});

export default config;

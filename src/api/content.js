import Tabletop from 'tabletop';
import config from '../config';

/**
 * Retrieve content from a Google Sheets Spreadsheet, which we use as as a
 * lightweight CMS for content we can't get from Ask's JSON export
 *
 * @returns {Promise} A promise to a Tabletop sheets response object
 */
export function getContent() {
  return new Promise((resolve) => {
    Tabletop.init({
      key: config.googleSheetId,
      callback: (data, tb) => {
        // extract fields, and only pass those.
        resolve(tb.sheets('Fields').all());
      },
      simpleSheet: true
    });
  });
}

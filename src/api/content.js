import Tabletop from 'tabletop';
import log from '../utils/log';

export function getFields() {
  return (
    new Promise((resolve) => {
      Tabletop.init({
        key: '18yAMk_ydGpPLHTZPrLox7oplvgc-4aswu1arO_IHY9I',
        callback: (data, tb) => {
          // extract fields, and only pass those.
          log(data);
          resolve(tb.sheets('Fields').all());
        },
        simpleSheet: true
      });
    })
  );
}

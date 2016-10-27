import Tabletop from 'tabletop';

export function getFields() {
  return (
    new Promise((resolve) => {
      Tabletop.init({

        // google spreadsheet key.
        // TODO: this will need to come from some place else
        // since people will clone their own.
        key: '18yAMk_ydGpPLHTZPrLox7oplvgc-4aswu1arO_IHY9I',
        callback: (data, tb) => {
          // extract fields, and only pass those.
          resolve(tb.sheets('Fields').all());
        },
        simpleSheet: true
      });
    })
  );
}

const XlsxStreamReader = require("xlsx-stream-reader");
const fs = require('fs')
const db = require('../models')

module.exports = {
  addData: async (req, res, next) => {
    try {
      const workBookReader = new XlsxStreamReader();

      workBookReader.on('error', function (error) {
        throw (error);
      });

      workBookReader.on('worksheet', async function (workSheetReader) {
        if (workSheetReader.id > 1) {
          workSheetReader.skip();
          return;
        }
        workSheetReader.on('row', async function (row) {
          if (row.attributes.r == 1) {
            // do something with row 1 like save as column names
          } else {

            console.log(`Inserting ${row.values[4]}`);

            try {
              await db.mheath_survey.create({
                username: row.values[4],
                inturn: 0,
                status: 0
              })
            } catch (err) {
              next(err)
            }
          }
        });
        workSheetReader.on('end', function () {
          // console.log(workSheetReader.rowCount);
        });

        // call process after registering handlers
        workSheetReader.process();
      });
      workBookReader.on('end', function () {
        // end of workbook reached
      });

      fs.createReadStream('./resources/data.xlsx').pipe(workBookReader);

      res.status(200).json({
        status: 'running',
        success: true
      })
    } catch (err) {
      res.status(400).json({
        status: err.message,
        success: false
      })
    }
  }
}
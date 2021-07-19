const circularJSON = require('circular-json');
module.exports.reqBody = (req) => {
  const newJson = circularJSON.stringify(req);
  return JSON.parse(newJson)
}
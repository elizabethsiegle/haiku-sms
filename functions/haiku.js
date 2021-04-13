let syllLib = require('syllable');
let request = require('rest-request');
let newReq = new request('https://api.datamuse.com');
function makeLine (numSyllables, wordPool) {
  if (numSyllables === 0) {
    numSyllables = 5;
  }
  let line = '';
  let totalNumSyllables = 0;
  while (totalNumSyllables < numSyllables) {
    line += ' ' + wordPool[Math.floor(Math.random() * wordPool.length)].word;
    totalNumSyllables = syllLib(line);
    if (totalNumSyllables > numSyllables) {
      line = '';
      totalNumSyllables = 0;
    }
  }
  return line.trim();
};
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.MessagingResponse();
  let haiku;
  console.log(`eventBody ${event.Body}`);
  newReq.get('/words', {rel_jja: event.Body.toLowerCase().trim(), max: 100}).then(function (words) {
    haiku = `${makeLine(5, words)} \n${makeLine(7, words)}\n${makeLine(5, words)}`;
    twiml.message(haiku);
    return callback(null, twiml);
  }
);
};

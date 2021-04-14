let syllLib = require('syllable');
const superagent = require('superagent');
function makeLine (numSyllables, wordPool) { //Func generates 3 lines according to input (haiku lines have syllables of # 5, 7, 5; generate words from list of words relating to input word)
  if (numSyllables == 0 || numSyllables != parseInt(numSyllables, 10)) {
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
exports.handler = async function(context, event, callback) {
  let twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.toLowerCase().trim();
  if(inbMsg.slice(-1) == "s") {
    inbMsg = inbMsg.slice(0,-1);
  }
  superagent.get(`https://api.datamuse.com/words`)
  .query({rel_jja: inbMsg, max: 100}) //query words related to inbound SMS
  .end((err, res) => {
    if(res.body.length == 0) { //Datamuse doesn't have any related words
      twiml.message(`Oh no I'm sorry \nYour haiku is out to eat \nTry a different word`); 
      return callback(null, twiml);
    }
    let haiku = `${makeLine(5, res.body)} \n${makeLine(7, res.body)}\n${makeLine(5, res.body)}`;
    twiml.message(haiku);
    return callback(null, twiml);  
  });
}


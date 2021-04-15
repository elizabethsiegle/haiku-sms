let syllLib = require('syllable');
const superagent = require('superagent');
function checkForAndSendDislaimer(client, sendTo, sendFrom) {
  const disclaimer = 'Thanks for texting! This bot uses Twilio Programmable Messaging for handling text messages, and Datamuse to generate words. If you want to learn more about the technology behind this, check out \n\nwww.datamuse.com/api\n\nGeneral Content Warning:\n\nThis bot pulls words according to number of syllables from a massive corpus of text, which means that the text it generates may reflect the biases of society at large. There is a chance that your response may contain language that is harmful.\n\nIf there are any problems, you can reach out to the developer behind the bot, @lizziepika on Twitter, or Datamuse\'s team directly.'
  const filter = {
      to: sendFrom,
      from: sendTo,
      dateSentAfter: new Date(Date.UTC(2021, 4, 14))
  }
  client.messages.list(filter)
    .then(messages => {
      if(messages.length == 1) {
        client.messages.create({
          body: disclaimer,
          to: sendTo,
          from: sendFrom,
        })
      }
    });
}
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
  const twilioClient = context.getTwilioClient()
  // If this number hasn't texted before, send them the disclaimer and blog link.
  checkForAndSendDislaimer(twilioClient, event.From, event.To)
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


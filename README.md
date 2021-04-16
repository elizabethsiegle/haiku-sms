### SMS-powered Haiku Generator with Twilio Serverless and Datamuse
[You can find the full tutorial here on the Twilio blog!](https://www.twilio.com/blog/sms-haiku-generator). It uses Superagent to make HTTP requests, the Datamuse API to search for words, and the Syllable npm module to check the number of syllables in words.

Text a word like "code" to +14243392702 to receive a haiku relating to that word, as seen below.
![code example SMS](https://twilio-cms-prod.s3.amazonaws.com/images/CwXq9jG7edy_PtD9FZitAaEOcblLeUVoiVwcJRmJVhAyR.width-1600.png)

### Prerequisites
1. A Twilio account - [sign up for a free one here and receive an extra $10 if you upgrade through this link](http://www.twilio.com/referral/iHsJ5D)
2. A Twilio phone number with SMS capabilities - [configure one here](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console)
3. Node.js installed - [download it here](https://nodejs.org/en/download/)

To run this code: download the repo and run the following to install the Twilio CLI and Serverless toolkit if you haven't already:
```bash
npm install twilio-cli -g
twilio login
twilio plugins:install @twilio-labs/plugin-serverless
```
Run `twilio serverless:deploy` to deploy the function and configure a Twilio phone number with it. If you haven't done so already, [search for and purchase a Twilio phone number from the console](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).

Set the section <em>A message comes in</em> to "Function". For <em>Service</em>, find the Twilio Function you just created, also known as "haiku-sms". Select "dev-environment" for <em>Environment</em> and set the <em>Function Path</em> to "/haiku" as seen below:
![configure phone number](https://twilio-cms-prod.s3.amazonaws.com/images/ZvA1Vt2lQFrFwP2GsVlpBcyPzo2OXpUuh7dANVWvCWQAy.width-1600.png)
Click the <strong>Save</strong> button at the bottom and text anything to your Twilio phone number for a response like this one:
![pokemon sms to haiku](https://twilio-cms-prod.s3.amazonaws.com/images/rvQPxql0UQI9NoALc__iDuICthMl2t5KvV-krivNH3Ey9.width-1600.png)
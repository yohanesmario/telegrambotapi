const Telegram = require('telegram-bot-api');

const api = new Telegram({
  token: '[API_TOKEN]', //Fill your bot API token here. 
  updates: {
    enabled: true //This one is to make sure the library is requesting for updates, or else, your program will exit
  }
});

//Register handler on update
api.on('update', function(notif) {
  //We're just gonna log the notif first
  console.log(notif);
});
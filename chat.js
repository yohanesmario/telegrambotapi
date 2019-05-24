const Telegram = require('telegram-bot-api');

const api = new Telegram({
  token: '[API_TOKEN]', //Fill your bot API token here. 
  updates: {
    enabled: true //This one is to make sure the library is requesting for updates, or else, your program will exit
  }
});

let chatIds = {};

//Register handler on update
api.on('update', function(notif) {
  //Get info
  let chatId = notif.message.chat.id;
  let username = notif.message.from.username;

  if (notif.message.text === '/subscribe') {
    //SUBSCRIBE TO CHAT
    chatIds[`${chatId}`] = chatId;
    api.sendMessage({
      chat_id: chatId,
      text: username + ' is subscribed!'
    });
  } else if (notif.message.text === '/unsubscribe') {
    //UNSUBSCRIBE TO CHAT
    delete chatIds[`${chatId}`];
    api.sendMessage({
      chat_id: chatId,
      text: username + ' is unsubscribed!'
    });
  } else {
    //PROPAGATE
    for (let cid in chatIds) {
      if (chatIds.hasOwnProperty(cid)) {
        //Send message to anyone subscribing
        api.sendMessage({
          chat_id: cid,
          text: '@' + username + ' said:\n\n' + notif.message.text
        });
      }
    }
  }

  console.log(chatIds);
});
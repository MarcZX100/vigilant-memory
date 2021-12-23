//const { apiToken } = require('./config.json');

// Make sure to install this with 'npm install dblapi.js`
const DBL = require('dblapi.js');
const { WebhookClient } = require("discord.js");
// The webhookPort can be whatever you want but make sure you open that port in the firewall settings (for linux for example you can use `sudo ufw allow 8000`)
// The webhookAuth is set by you, make sure you keep it secure and don\'t leak it
const dbl = new DBL(process.env.apiToken, { webhookPort: 3000, webhookAuth: process.env.AUTH });

// When the webhook is ready log it to the console, this will log `Webhook up and running at http://0.0.0.0:8000/dblwebhook`
dbl.webhook.on('ready', hook => {
   console.log(`Webhook up and running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

// This will just log errors if there are any
dbl.on('error', e => {
   console.log(`Oops! ${e}`);
})

// When the webhook receives a vote
dbl.webhook.on('vote', async vote => {
   // This will log the whole vote object to the console
   console.log(vote)
   // Get the Discord ID of the user who voted
   const userID = vote.user;



const webhookClient = new WebhookClient({ url: process.env.webhook });
 await webhookClient.send(`User with ID \`${userID}\` just voted!`);
})

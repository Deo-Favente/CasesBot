const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const colors = require("colors");

// Custom tag to show in console on start
const tag =
`
/$$$$$$$                                /$$$$$$$              /$$    
| $$__  $$                              | $$__  $$            | $$    
| $$  \ $$  /$$$$$$  /$$   /$$ /$$   /$$| $$  \ $$  /$$$$$$  /$$$$$$  
| $$$$$$$  /$$__  $$|  $$ /$$/| $$  | $$| $$$$$$$  /$$__  $$|_  $$_/  
| $$__  $$| $$  \ $$ \  $$$$/ | $$  | $$| $$__  $$| $$  \ $$  | $$    
| $$  \ $$| $$  | $$  >$$  $$ | $$  | $$| $$  \ $$| $$  | $$  | $$ /$$
| $$$$$$$/|  $$$$$$/ /$$/\  $$|  $$$$$$$| $$$$$$$/|  $$$$$$/  |  $$$$/
|_______/  \______/ |__/  \__/ \____  $$|_______/  \______/    \___/  
                               /$$  | $$                              
                              |  $$$$$$/                              
                               \______/                               
`

// Creating a new client:
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: "Developed by Deo_Favente#8275",
      type: 0
    }],
    status: 'dnd'
  }
});

// Host the bot:
require('http').createServer((req, res) => res.end('Ready.')).listen(3000);

// Getting the bot token:
const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Vous n'avez pas précisé de Token ! Remplissez le fichier config.js et réessayez.".red)
  return process.exit();
};

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach((file) => {
  require(`./handlers/${file}`);
});

// Login to the bot:
client.login(AuthenticationToken)
  .then(() => {
    console.log(`[STARTUP] Logged in as ${client.user.tag}!`.green);
    if (tag) console.log(tag.blue)
  })
  .catch((err) => {
    console.error("[CRASH] Une erreur s'est produite dans le fonctionnement du bot. Contactez le développeur du bot (Deo_Favente#8275) pour plus d'informations ...");
    console.error("[CRASH] Erreur de l'API Discord :" + err);
    return process.exit();
  });

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Une erreur s'est produite dans le fonctionnement du bot. Contactez le développeur du bot (Deo_Favente#8275) pour plus d'informations : ${err}`.red);
  console.error(promise);
});

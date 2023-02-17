const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "ping",
    description: "Montrer la latence du bot.",
    aliases : ['p', 'latence', 'latency']
  },
  permissions: ['SendMessages'],

  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    // Renvoie la latence du bot
    message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle(`🏓 PONG!`)
        .setDescription(
          `**Latence du Bot:** \`${client.ws.ping}\` ms.`
          + `\n**Latence de l'API:** \`${Date.now() - message.createdTimestamp}\` ms.`
        )
        .setColor("Blue")
        .setFooter({text: "Bot by Deo_Favente#8275", iconURL : config.Users.AUTHOR_ICON_URL})
    ] })
    
  },
};

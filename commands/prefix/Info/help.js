const { EmbedBuilder, codeBlock } = require("discord.js");
const fs = require('fs');

module.exports = {
  config: {
    name: "help",
    description: "Renvoie la liste des commandes du bot.",
    aliases: ['h', 'commands', 'cmds']
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config) => {
    const commands = client.prefix_commands.map(command => `${command.config.name}`);

    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
            .setTitle(`📜 HELP`)
            .setDescription(
              `**Liste des commandes du bot :** \n- `
              + commands.join('\n- '))
            .addFields(
              { name: "Besoin de plus d'informations sur une commande ?", value: `Utilisez la commande ${codeBlock("txt", prefix + "info [command]")}`},
            )
            .setFooter({ text: "Bot by Deo_Favente#8275", iconURL: config.Users.AUTHOR_ICON_URL })
            .setColor('Blue')
        ]
      }
    );

  },
};

const { EmbedBuilder, codeBlock } = require("discord.js"); 

module.exports = {
  config: {
    name: "info",
    description: "Renvoie les informations d'une commande.",
    usage: "info [command]",
    aliases : ['command', 'cmd']
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    // Pas de commande spécifiée
    if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("❌ Vous devez spécifier une commande.")
          .setColor("Red")
      ],
    });

    const command = client.prefix_commands.get(args[0].toLowerCase());

    // Commande inexistante
    if (!command) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("❌ Cette commande n'existe pas.")
          .setColor("Red")
      ],
    });

    // Renvoie les informations de la commande
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`ℹ️ INFO`)
          .setDescription(`Commande : **${command.config.name.toUpperCase()}**`)
          .addFields(
            { name: 'Description :', value: command.config.description || "Aucune description n'a été précisée" },
            { name: 'Aliases :', value: command.config.aliases ? codeBlock('txt', command.config.aliases.join(", ")) : "Aucun alias n'a été précisé" },
            { name: 'Usage :', value: command.config.usage ? codeBlock('txt', command.config.usage) : "Aucun usage n'a été précisé" },
            { name: 'Permissions necéssaires :', value: command.permissions ? codeBlock('txt', command.permissions.join(", ")) : "Aucune permission n'a été précisée" },
          )
          .setColor("Blue")
          .setFooter({text: "Bot by Deo_Favente#8275", iconURL : config.Users.AUTHOR_ICON_URL})
      ]
    });
  },
};

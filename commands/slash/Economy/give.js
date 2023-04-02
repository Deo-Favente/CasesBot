const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "give",
  description: "Permet de donner de l'argent ou des items à un joueur.",
  type: 1,
  options: [
    {
      name: "user",
      description: "Le joueur à qui donner de l'argent ou des items.",
      type: 6,
    },
    {
      name: "money",
      description: "L'argent à donner au joueur.",
      type: 4,
    },
    {
      name: "items",
      description: "Les items à donner au joueur.",
      type: 3,
    },
  ],
  permissions: {
    // Perm admin
  },
  run: async (client, interaction, config, db) => {
    user = interaction.options.getUser("user");
    money = interaction.options.getInteger("money");
    items = interaction.options.getString("items");

    if (user == null) {
      return interaction.reply({
        content: "Veuillez mentionner un joueur.",
        ephemeral: true,
      });
    }

    if (money == null && items == null) {
      return interaction.reply({
        content: "Veuillez spécifier un montant d'argent ou des items à donner.",
        ephemeral: true,
      });
    }

    if (money != null) {
      await db.run(
        "UPDATE users SET money = money + ? WHERE user_id = ?",
        [money, user.id],
        function (err) {
          if (err) {
            console.error(err.message);
          }
        }
      );
    }

    if (items != null) {
      await db.run(
        "UPDATE users SET items = json_array(?) WHERE user_id = ?",
        [items, user.id],
        function (err) {
          if (err) {
            console.error(err.message);
          }
        }
      );
    }

    const gived = items != null ? "un " + items : money ? money + "$" : "Rien";
    const finalEmbed = new EmbedBuilder()
      .setTitle(`🫴 GIVE`)
      .setDescription(
        `**${interaction.user.username}**, tu as donné **${gived}** à **${user.username}**.`
      )
      .setColor("Green")
      .setFooter({
        text: "Bot by Deo_Favente#8275",
        iconURL: config.Users.AUTHOR_ICON_URL,
      });

    return interaction.reply({
      embeds: [finalEmbed],
    });
  },
};

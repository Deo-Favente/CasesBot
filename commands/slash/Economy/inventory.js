const { EmbedBuilder } = require("discord.js");
const { CONSTRAINT } = require("sqlite3");

module.exports = {
  name: "inventory",
  description: "Affiche l'inventaire d'un joueur.",
  type: 1,
  options: [],
  permissions: {
    DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
  },
  run: async (client, interaction, config, db) => {
      await db.run(
          "INSERT INTO users (user_id, money, items) VALUES (?, ?, ?) ON CONFLICT(user_id) DO NOTHING",
          [interaction.user.id, 0, "Aucun"]);
      await db.get(
          "SELECT * FROM users WHERE user_id = ?", [interaction.user.id], function (err, row) {
        if (err) {
          console.error(err.message);
        }
              
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`📦 INVENTAIRE`)
              .setDescription(
                `**${interaction.user.username}**, voici ton inventaire:`
              )
              .addFields(
                { name: "💰 Argent:", value: `${row.money}`, inline: true },
                { name: "🎁 Items:", value: `${row.items}`, inline: true }
              )
              .setColor("Green")
              .setFooter({
                text: "Bot by Deo_Favente#8275",
                iconURL: config.Users.AUTHOR_ICON_URL,
              }),
          ],
        });
      }
    );
  },
};

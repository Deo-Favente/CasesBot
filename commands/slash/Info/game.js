const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "game",
    description: "Explique comment jouer au jeu.",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`🕹 GAME`)
                    .setDescription("**Bienvenue sur BoxyBot !**\n Développé par Deo_Favente#8275, ce bot vous permet d'ouvrir une multitude de caisses aléatoires, d'y récupérer des armes et du matériel, de combattre d'autres joueurs et de parier sur vos combats !")
                    .addFields(
                        { name: "Comment jouer !", value: "Pour jouer, il vous suffit de taper la commande `/start`.\nVous pouvez ensuite choisir votre classe et recevoir vos premiers équipements !" },
                        { name: "Besoin d'aide sur les commandes ?", value: "Utilisez la commande `!help` pour obtenir la liste des commandes disponibles." },
                        { name: "Un bug, un problème, une suggestion ?", value: "Vous pouvez me contacter sur Discord (Deo_Favente#8275) pour m'en faire part !"}
                        
                    )
                    .setColor('Blue')
                    .setFooter({ text: "Bot by Deo_Favente#8275", iconURL: config.Users.AUTHOR_ICON_URL })
            ], ephemeral: true
        })
    },
};

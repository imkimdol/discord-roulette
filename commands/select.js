const { SlashCommandBuilder } = require('discord.js');

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select')
        .setDescription('Randomly selects from one of the given options.')
        .addStringOption(option =>
            option.setName('options').setDescription('Enter options, separated by commas.').setRequired(true)
        ),
    async execute(interaction, client) {
        await interaction.deferReply();

        try {
            const optionsString = interaction.options.getString('options');
            const options = optionsString.split(",");
            const optionsTrimmed = options.map(o => o.trim());

            const selectionIndex = getRandomInt(0, optionsTrimmed.length-1);

            interaction.editReply(`The selected option is: \`${optionsTrimmed[selectionIndex]}\`!!`);
        } catch (err) {
            console.error(err);
        }
    },
};
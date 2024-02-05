import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import CommandsClient from './../commandsClient';

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min: number, max: number) => {
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
    async execute(interaction: ChatInputCommandInteraction, client: CommandsClient) {
        await interaction.deferReply();

        try {
            const optionsString = interaction.options.getString('options');
            if (optionsString == null) throw new Error('Options is null!');

            const options = optionsString.split(",");
            const optionsTrimmed = options.map(o => o.trim());

            const selectionIndex = getRandomInt(0, optionsTrimmed.length-1);

            interaction.editReply(`The selected option is: \`${optionsTrimmed[selectionIndex]}\`!!`);
        } catch (err) {
            console.error(err);
        }
    },
};
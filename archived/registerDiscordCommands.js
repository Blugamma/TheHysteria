const { REST, Routes } = require("discord.js");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const commands = [
    {
        name: 'choice1',
        description: 'You can choice your first option for raid',
    },
    {
        name: 'choice2',
        description: 'You can choice your 2nd option for raid',
    },
    {
        name: 'choice3',
        description: 'You can choice your 3rd option for raid',
    },
    {
        name: 'remove-choice1',
        description: 'Remove your 1st choice',
    },
    {
        name: 'remove-choice2',
        description: 'Remove your 2nd choice',
    },
    {
        name: 'remove-choice3',
        description: 'Remove your 3rd choice',
    },
    {
        name: 'add-comment',
        description: 'Add a comment to your entry',
    },

]

async function loadCommands(){
    try{
        const database = client.db('thehysteria');
        const discordToken = database.collection('discordToken');
        const discordTokenData = await discordToken.findOne();
        const token = discordTokenData.token;
        const clientID = discordTokenData.clientID;
        const guildID = discordTokenData.guildID;

        const rest = new REST({ version: '10'}).setToken(token);

        console.log("Registering slash commands...")
        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        )

        console.log("Slash commands registered successfully...")
    }
    catch (error){
        console.log(error);
    }
}
loadCommands();
const { REST, Routes } = require("discord.js");
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const commands = [
    {
        name: 'choice1',
        description: 'You can choice your first option for raid',
    },
]

async function loadCommands(){
    try{
        const database = client.db('thehysteria');
        const discordToken = database.collection('discordToken');
        const discordTokenData = await discordToken.findOne();
        const token = discordTokenData.token;

        const rest = new REST({ version: '10'}).setToken(token);

        console.log("Registering slash commands...")
        await rest.put(
            Routes.applicationGuildCommands("639561961440280590", "421044100687724557"),
            { body: commands }
        )

        console.log("Slash commands registered successfully...")
    }
    catch (error){
        console.log(error);
    }
}
loadCommands();
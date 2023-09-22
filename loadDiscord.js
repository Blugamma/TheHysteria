const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Events } = require('discord.js');
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

async function loadDiscord(){
    const database = client.db('thehysteria');
    const discordToken = database.collection('discordToken');
    const discordTokenData = await discordToken.findOne();
    const token = discordTokenData.token;
    const clientId = discordTokenData.clientID;


    
    discordClient.on('ready', () => {
        console.log(`Logged in as ${discordClient.user.tag}!`);
       });

    discordClient.on('interactionCreate', async (interaction) =>{
      if (interaction.isChatInputCommand()){
        if (interaction.commandName == 'choice1'){
          const modal = new ModalBuilder()
            .setCustomId('choice1')
            .setTitle('Choice 1');
  
            const characterNameInput = new TextInputBuilder()
              .setCustomId('characterName')
                // The label is the prompt the user sees for this input
              .setLabel("What is your character name?")
                // Short means only a single line of text
              .setStyle(TextInputStyle.Short);
  
            const classInput = new TextInputBuilder()
              .setCustomId('class')
              .setLabel("What is your class?")
                // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Short);

              const roleInput = new TextInputBuilder()
              .setCustomId('role')
              .setLabel("What is your role?")
                // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Short);
  
              // An action row only holds one text input,
              // so you need one action row per text input.
              const firstActionRow = new ActionRowBuilder().addComponents(characterNameInput);
              const secondActionRow = new ActionRowBuilder().addComponents(classInput);
              const thirdActionRow = new ActionRowBuilder().addComponents(roleInput);
  
              // Add inputs to the modal
              modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
  
              // Show the modal to the user
              await interaction.showModal(modal);
             
        }
      }

      

      if (interaction.isModalSubmit()){
        if (interaction.customId === 'choice1') {
          // console.log(interaction);
          const characterNameResponse = interaction.fields.getTextInputValue('characterName');
          const classResponse = interaction.fields.getTextInputValue('class');
          const roleResponse = interaction.fields.getTextInputValue('role');
          const classCollection = database.collection('class');
          const classDoesItExist = await classCollection.findOne({class: { $regex: new RegExp(classResponse, 'i') }});

          const roleCollection = database.collection('roles');
          const roleDoesItExist = await classCollection.find({role: { $regex: new RegExp(roleResponse, 'i') }}, {alias: { $regex: new RegExp(roleResponse, 'i') }});


          if(roleDoesItExist == null && classDoesItExist == null){
            
            await interaction.reply("ERROR - '" + roleResponse + "' does not exist as a role and '" + classResponse + "' does not exist as a class, please try again!");
          }
          else if (roleDoesItExist == null){
            await interaction.reply("ERROR - '" + roleResponse + "' does not exist as a role, please try again!");
          }
          else if (classDoesItExist == null){
            await interaction.reply("ERROR - '" + classResponse + "' does not exist as a class, please try again!");
          }
          else{
            await interaction.reply({ content: 'Your submission was received successfully! - go to https://thehysteria.cyclic.cloud/ to see your entry!' });
          }
        
          
          //a
        }
      } 
      

      
    })  
    discordClient.login(token);
}

loadDiscord()

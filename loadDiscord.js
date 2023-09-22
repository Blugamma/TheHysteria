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
   


    
    discordClient.on('ready', () => {
        console.log(`Logged in as ${discordClient.user.tag}!`);
       });

    discordClient.on('interactionCreate', async (interaction) =>{
      if (interaction.isChatInputCommand()){
        if (interaction.commandName == 'choice1'){
          const modal = new ModalBuilder()
            .setCustomId('choice1')
            .setTitle('1st Choice');
  
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
        if (interaction.commandName == 'remove-choice1'){
          const players = database.collection('players');
          const player = await players.findOne({discordName: interaction.user.globalName});
          if (player.characterName1 != null && player.class1 != null && player.role1 != null){
            await players.updateOne({ discordName: interaction.user.globalName }, { $unset: { characterName1: "", class1: "", role1: "" } } )
            await interaction.reply({ content: 'Your 1st choice was successfully removed! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          else{
            await interaction.reply({ content: 'Your 1st choice has already been deleted! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
        }
        if (interaction.commandName == 'choice2'){
          const modal = new ModalBuilder()
            .setCustomId('choice2')
            .setTitle('2nd Choice');
  
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

        if (interaction.commandName == 'remove-choice2'){
          const players = database.collection('players');
          const player = await players.findOne({discordName: interaction.user.globalName});
          if (player.characterName2 != null && player.class2 != null && player.role2 != null){
            await players.updateOne({ discordName: interaction.user.globalName }, { $unset: { characterName2: "", class2: "", role2: "" } } )
            await interaction.reply({ content: 'Your 2nd choice was successfully removed! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          else{
            await interaction.reply({ content: 'Your 2nd choice has already been deleted! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          
        }

        if (interaction.commandName == 'choice3'){
          const modal = new ModalBuilder()
            .setCustomId('choice3')
            .setTitle('3rd Choice');
  
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

        if (interaction.commandName == 'remove-choice3'){
          const players = database.collection('players');
          const player = await players.findOne({discordName: interaction.user.globalName});
          if (player.characterName3 != null && player.class3 != null && player.role3 != null){
            await players.updateOne({ discordName: interaction.user.globalName }, { $unset: { characterName3: "", class3: "", role3: "" } } )
            await interaction.reply({ content: 'Your 3rd choice was successfully removed! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          else{
            await interaction.reply({ content: 'Your 3rd choice has already been deleted! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          
          
  
        }
  
        if (interaction.commandName == 'add-comment'){
          const modal = new ModalBuilder()
            .setCustomId('addComment')
            .setTitle('Add Comment');
  
            const commentInput = new TextInputBuilder()
              .setCustomId('comment')
                // The label is the prompt the user sees for this input
              .setLabel("Comment")
                // Short means only a single line of text
              .setStyle(TextInputStyle.Paragraph);
  
           
              // An action row only holds one text input,
              // so you need one action row per text input.
              const firstActionRow = new ActionRowBuilder().addComponents(commentInput);
  
              // Add inputs to the modal
              modal.addComponents(firstActionRow);
  
              // Show the modal to the user
              await interaction.showModal(modal);
        }
      }

      


      if (interaction.isModalSubmit()){
        if (interaction.customId === 'choice1') {
          //console.log(interaction);
          const characterNameResponse = interaction.fields.getTextInputValue('characterName');
          const classResponse = interaction.fields.getTextInputValue('class');
          const roleResponse = interaction.fields.getTextInputValue('role');
          const classCollection = database.collection('class');
          const classDoesItExist = await classCollection.findOne({class: { $regex: new RegExp(classResponse, 'i') }});

          const roleCollection = database.collection('roles');
          const roleDoesItExist = await roleCollection.findOne({role: { $regex: new RegExp(roleResponse, 'i') }});


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

            const players = database.collection('players');
            const doesPlayerExist = await players.findOne({discordName: interaction.user.globalName});

            if (doesPlayerExist == null){
              var playersCount = 0;
              
              players.countDocuments().then(async (count) =>{
                playersCount = count + 1;
                await players.insertOne( { _id: playersCount, discordName: interaction.user.globalName, characterName1: characterNameResponse, class1: classDoesItExist.class, role1: roleDoesItExist.role } )
                await interaction.reply({ content: 'Your 1st choice was successfully added! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
              });
            }
            else{
              await players.updateOne({ discordName: interaction.user.globalName }, { $set: { characterName1: characterNameResponse, class1: classDoesItExist.class, role1: roleDoesItExist.role } })
              await interaction.reply({ content: 'Your 1st choice was successfully updated! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
            }
            
            
          }
        
          
          
        }

        if (interaction.customId === 'choice2') {
          //console.log(interaction);
          const characterNameResponse = interaction.fields.getTextInputValue('characterName');
          const classResponse = interaction.fields.getTextInputValue('class');
          const roleResponse = interaction.fields.getTextInputValue('role');
          const classCollection = database.collection('class');
          const classDoesItExist = await classCollection.findOne({class: { $regex: new RegExp(classResponse, 'i') }});

          const roleCollection = database.collection('roles');
          const roleDoesItExist = await roleCollection.findOne({role: { $regex: new RegExp(roleResponse, 'i') }});


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

            const players = database.collection('players');
            const doesPlayerExist = await players.findOne({discordName: interaction.user.globalName});

            if (doesPlayerExist == null){
              var playersCount = 0;
              
              players.countDocuments().then(async (count) =>{
                playersCount = count + 1;
                await players.insertOne( { _id: playersCount, discordName: interaction.user.globalName, characterName2: characterNameResponse, class2: classDoesItExist.class, role2: roleDoesItExist.role } )
                await interaction.reply({ content: 'Your 2nd choice was successfully added! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
              });
            }
            else{
              await players.updateOne({ discordName: interaction.user.globalName }, { $set: { characterName2: characterNameResponse, class2: classDoesItExist.class, role2: roleDoesItExist.role } })
              await interaction.reply({ content: 'Your 2nd choice was successfully updated! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
            }
            
            
          }
        
          
          
        }

        if (interaction.customId === 'choice3') {
          //console.log(interaction);
          const characterNameResponse = interaction.fields.getTextInputValue('characterName');
          const classResponse = interaction.fields.getTextInputValue('class');
          const roleResponse = interaction.fields.getTextInputValue('role');
          const classCollection = database.collection('class');
          const classDoesItExist = await classCollection.findOne({class: { $regex: new RegExp(classResponse, 'i') }});

          const roleCollection = database.collection('roles');
          const roleDoesItExist = await roleCollection.findOne({role: { $regex: new RegExp(roleResponse, 'i') }});


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

            const players = database.collection('players');
            const doesPlayerExist = await players.findOne({discordName: interaction.user.globalName});

            if (doesPlayerExist == null){
              var playersCount = 0;
              
              players.countDocuments().then(async (count) =>{
                playersCount = count + 1;
                await players.insertOne( { _id: playersCount, discordName: interaction.user.globalName, characterName3: characterNameResponse, class3: classDoesItExist.class, role3: roleDoesItExist.role } )
                await interaction.reply({ content: 'Your 3rd choice was successfully added! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
              });
            }
            else{
              await players.updateOne({ discordName: interaction.user.globalName }, { $set: { characterName3: characterNameResponse, class3: classDoesItExist.class, role3: roleDoesItExist.role } })
              await interaction.reply({ content: 'Your 3rd choice was successfully updated! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
            }
            
            
          }
        
          
          
        }

        if (interaction.customId === 'addComment') {
          //console.log(interaction);
          const commentResponse = interaction.fields.getTextInputValue('comment');

          const players = database.collection('players');
          const doesPlayerExist = await players.findOne({discordName: interaction.user.globalName});

          if (doesPlayerExist == null){
            await players.insertOne( { _id: playersCount, discordName: interaction.user.globalName, comment: commentResponse } )
            await interaction.reply({ content: 'Your comment was successfully added! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }
          else{
            await players.updateOne({ discordName: interaction.user.globalName }, { $set: { comment: commentResponse } })
            await interaction.reply({ content: 'Your comment was successfully updated! - go to https://thehysteria.cyclic.cloud/raid-roster to see your entry!' });
          }

        
          
          
        }
      } 
      

      
    })  
    discordClient.login(token);
}

loadDiscord()

const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 3000

// const test = require("./loadDiscordCommands.js")
const loadExternalAPIs = require("./loadDiscord.js");

app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.set('view engine','pug')

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);



app.get('/', async (req, res) => {
  var title = "Home"
  res.render("index", { title });
})
  
  

   
    
app.get('/raid-roster', (req, res) => {
  

  const database = client.db('thehysteria');
  const playersCollection = database.collection('players');
  const playersCollectionData =  playersCollection.find({});

  const players = [];
  playersCollectionData.forEach(function(player){
    var title = "Raid Roster"
    var playerObject = {
      _id: player._id,
      discordName: player.discordName,
      characterName1: player.characterName1,
      class1: player.class1,
      role1: player.role1,
      characterName2: player.characterName2,
      class2: player.class2,
      role2: player.role2,
      characterName3: player.characterName3,
      class3: player.class3,
      role3: player.role3,
      comment: player.comment
    }
    
    players.push(playerObject)
    res.render("raid-roster", { title, players});
  })
    

    
    



  
  
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const path = require("path");
const app = express()
const port = 3000

// const test = require("./loadDiscordCommands.js")
const loadExternalAPIs = require("./loadDiscord.js");

app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs')

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);



app.get('/', async (req, res) => {
  
  res.render("index");
})
  
  

   
    
app.get('/raid-roster', async (req, res) => {
  

   

  res.render("raid-roster");
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
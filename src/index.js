const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`successfully logged in as ${client.user.tag}`)
})

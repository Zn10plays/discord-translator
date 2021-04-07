const Discord = require('discord.js')
const translate = require('./translate-api/translate')
require('dotenv').config()

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`successfully logged in as ${client.user.tag}`)
})

client.on('message', async (msg) => {
  if (sleeptime) return
  if (msg.channel.guild.id !== process.env.GUILDID) return
  if (!msg.content.startsWith(process.env.PREFIX)) return
  msg.channel.startTyping()
  sleep()
  const translated = await translate(msg.content.slice(3), 'auto', 'en')
  msg.channel.stopTyping()

  msg.channel.send(translated)
})
function sleep (time) {
  sleeptime = true
  setTimeout(() => { sleeptime = false }, time)
}
let sleeptime

client.login(process.env.TOKEN)

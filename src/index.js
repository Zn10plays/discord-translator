const Discord = require('discord.js')
const translate = require('./translate-api/translate')
require('dotenv').config()

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`successfully logged in as ${client.user.tag}`)
})

let sleepTime

client.on('message', async (msg) => {
  if (sleepTime) return
  if (msg.channel.guild.id !== process.env.GUILDID) return

  const cmd = msg.content.match(/^\/t (?<langFrom>\w+) (?<langTo>\w+) (?<content>.+)$/) ? msg.content.match(/^\/t (?<langFrom>\w+) (?<langTo>\w+) (?<content>.+)$/) : null
  if (!cmd) return

  sleep()

  msg.channel.startTyping()
  const translated = await translate(cmd.groups.content, cmd.groups.langFrom, cmd.groups.langTo)
  msg.channel.stopTyping()

  msg.channel.send(translated)
})
function sleep (time) {
  sleepTime = true
  setTimeout(() => { sleepTime = false }, time)
}

client.login(process.env.TOKEN)

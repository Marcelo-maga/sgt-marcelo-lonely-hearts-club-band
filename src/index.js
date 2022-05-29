require('dotenv').config()
const Discord = require('discord.js')
const prefix = '!'

const client = new Discord.Client()

// optei por usar uma versão anterior da biblioteca do DiscordJs para facilitar o desenvolvimento
client.on('ready', () => {
  console.log('O Bot está no ar')
  i = 0
  var activities = [
    `Cat food`,
    `cAt food`,
    `caT food`,
    `cat Food`,
    `cat fOod`,
    `cat foOd`,
    `cat fooD`,
    `AGAIN!`
  ] // King Crimson pocando no bot e fé

  setInterval(() => client.user.setActivity(`${activities[i++ %
    activities.length]}`, {
      type: 'LISTENING'
  }), 1000 * 3)
  
  client.user.setStatus("online")
})

client.commands = new Discord.Collection()

// Commands hadler
client.on('message',  message => {
  // pega os argurmentos e converte ele para uma string
  const args = message.content
    .trim().slice(prefix.length)
    .split(/ +/g)

  const command = args.shift().toLowerCase()

	if (message.author.bot) return
	if (message.channel.type === 'dm') return
	if (!message.content.toLowerCase().startsWith(prefix)) return
	if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return
  
  // Procura o arquivo do comando na pasta
  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args)
  } catch (err) {
    console.error('Erro:' + err);
  }
})

client.login(process.env.TOKEN) // Token gerado na aba de desenvolvedor do Discord
const { queueUrl, queueName } = require('../queueFile')
const player = require('../provider/player')

// básicamente jogar a posição zero da fila fora e dps chamar a função de play novamente
module.exports.run = async (client, message, args) => {
  queueName.shift()
  queueUrl.shift()

  await message.member.voice.channel.join().then((connection) => {
    player(connection)
  })
  
  return message.channel.send(`Está tocando **${queueName[0]}**`)
}
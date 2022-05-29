const search = require('../provider/search')
const { queueUrl, queueName } = require('../queueFile')
const player = require('../provider/player')

module.exports.run = async (client, message, args) => {

  if(!args) return
  
  // isso daqui vai salvar a busca mais pra frente, confia
  // basicamente eu peguei todos os argumentos e fiz uma frase com eles
  var arguments = args
  var args = [].slice.call(arguments)
  const musicName = args.join(' ')

  const { nameVideo, url } = await search(musicName)

  await message.member.voice.channel.join().then((connection) => {
    queueUrl.push(url)
    queueName.push(nameVideo)
    if (queueUrl.length === 1) {
      player(connection)
      return message.channel.send(`Está tocando **${queueName[0]}**`)
    }
  })
}
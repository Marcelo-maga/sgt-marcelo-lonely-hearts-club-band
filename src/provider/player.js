const ytdl = require('ytdl-core')
const streamOptions = { seek: 0, volume: 1 }
const { queueUrl, queueName  } = require('../queueFile')

async function player(connection) {
  connection.play(ytdl(`${queueUrl[0]}`, streamOptions).on('end', () => {
    queueUrl.shift()
    queueName.shift()
    if (queueUrl.length >= 1) {
      playQueue(queueUrl[0])
      return message.channel.send(`Está tocando **${queueName[0]}**`)
    }
  }))
}

module.exports = player
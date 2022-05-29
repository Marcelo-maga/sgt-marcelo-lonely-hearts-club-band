const axios = require('axios')

async function search(musicName) {
  // Link da api do youtube
  const id = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      q: musicName, // q é o parametro de busca, que vem da função play com o nome da busca
      part: "snippet", // a forma de busca, na documentação existe várias outras mas a padrão me ajudou mais
      key: process.env.YT_TOKEN // a chave da api gerada na google
    }
  })

  // na documentação tem a forma que o json é retornado para facilitar todo o trampo

  const nameVideo = id.data.items[0].snippet.title
  const idVideo = id.data.items[0].id.videoId

  // com o id do video é só pocar no link e ser feliz
  const url = `https://www.youtube.com/watch?v=${idVideo}`

  return { nameVideo, url }
}

module.exports = search
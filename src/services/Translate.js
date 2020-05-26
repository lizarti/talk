const yandexAPIUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const yandexAPIKey = 'trnsl.1.1.20200526T034611Z.9f1527b2c827c674.8585de5c9c8edaeeb471ebdb4153056d88a2dfb0'

export default class Translate {
  translateSentence (sentence) {
    return new Promise((resolve, reject) => {
      const url = new URL(yandexAPIUrl)
      const params = new URLSearchParams()
      params.set('text', sentence.text)
      params.set('key', yandexAPIKey)
      params.set('lang', `${sentence.from}-${sentence.to}`)

      url.search = params

      fetch(url, {
        method: 'GET'
      }).then(res => res.json()).then(resolve).catch(reject)
    })
  }
}

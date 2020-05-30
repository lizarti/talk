import { yandexAPIUrl, yandexAPIKey } from '../config'
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

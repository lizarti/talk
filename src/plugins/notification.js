import { EventEmitter } from '../utils/EventEmitter'

const isObject = val => val !== null && typeof val === 'object'

class Notification extends EventEmitter {
  notify (notification) {
    this.emit('notify', notification)
  }

  info (notification) {
    notification = this.createNotificationObject(notification)
    notification.type = 'info'
    this.notify(notification)
  }

  warn (notification) {
    notification = this.createNotificationObject(notification)
    notification.type = 'warn'
    this.notify(notification)
  }

  error (notification) {
    notification = this.createNotificationObject(notification)
    notification.type = 'error'
    this.notify(notification)
  }

  success (notification) {
    notification = this.createNotificationObject(notification)
    notification.type = 'success'
    this.notify(notification)
  }

  createNotificationObject (notification) {
    if (!isObject(notification)) {
      return {
        content: notification
      }
    }
    return notification
  }
}

const instance = new Notification()

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$notification', {
    get () {
      return instance
    }
  })
}

export default class Room {
  constructor (atributos) {
    Object.assign(this, atributos)
  }

  othersParticipants (me) {
    const others = []

    for (const participantId in this.participants) {
      if (participantId !== me) {
        others.push(this.participants[participantId])
      }
    }
    return others
  }

  otherParticipant (me) {
    const others = this.othersParticipants(me)
    if (others && others.length) {
      return others[0]
    }
  }

  user (userId) {
    return this.participants[userId]
  }

  me (userId) {
    return this.user(userId)
  }

  hasUser (userId) {
    return !!this.participants[userId]
  }
}

export default class Room {
  constructor (atributos) {
    Object.assign(this, atributos)
  }

  othersParticipants (me) {
    return this.participants && this.participants.filter(p => {
      return p.id !== me.id
    })
  }

  otherParticipant (me) {
    const others = this.othersParticipants(me)
    if (others && others.length) {
      return others[0]
    }
  }
}

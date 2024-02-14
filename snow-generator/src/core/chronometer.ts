import { Clock } from 'three'
import eventEmitter from './event/event-emitter'

const clock = new Clock()

class Chronometer {
	tick = () => {
		eventEmitter.publish('tick', clock)
		requestAnimationFrame(this.tick.bind(this))
	}
}

const chronometer = new Chronometer()

export default chronometer

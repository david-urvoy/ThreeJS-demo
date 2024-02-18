import { Clock } from 'three'
import eventEmitter from './event/event-emitter'
import { stats } from './debug/monitor'

const clock = new Clock()

class Chronometer {
	tick = () => {
		stats.begin()
		eventEmitter.publish('tick', clock)
		requestAnimationFrame(this.tick.bind(this))
		stats.end()
	}
}

const chronometer = new Chronometer()

export default chronometer

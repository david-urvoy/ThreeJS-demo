import { EventTypes } from './event-types'

export class EventEmitter<T> {
	private listeners: { [P in keyof EventTypes]?: EventTypes[P][] } = {}
	private listenersOncer: { [P in keyof EventTypes]?: EventTypes[P][] } = {}

	subscribe = <eventType extends keyof EventTypes>(eventType: eventType, listener: EventTypes[eventType]): Disposable => {
		if (!this.listeners[eventType]) this.listeners[eventType] = [listener]
		else this.listeners[eventType]?.push(listener)
		return {
			[Symbol.dispose]: () => this.unsubscribe(eventType, listener)
		}
	}

	once = <eventType extends keyof EventTypes>
		(eventType: eventType, listener: EventTypes[eventType]) => this.listenersOncer[eventType]?.push(listener)

	unsubscribe = <eventType extends keyof EventTypes>(eventType: eventType, listener: EventTypes[eventType]) => {
		const callbackIndex = this.listeners[eventType]?.indexOf(listener) ?? -1
		if (callbackIndex > -1) this.listeners[eventType]?.splice(callbackIndex, 1)
	}

	publish = <eventType extends keyof EventTypes>(eventType: eventType, event: Parameters<EventTypes[eventType]>[number]) => {
		this.listeners[eventType]?.forEach(listener => listener(event))
		if (this.listenersOncer[eventType] && this.listenersOncer[eventType].length > 0) {
			const toCall = this.listenersOncer[eventType]
			this.listenersOncer[eventType] = []
			toCall?.forEach(listener => listener(event))
		}
	}

	pipe = <eventType extends keyof EventTypes>
		(eventType: eventType, otherEmitter: EventEmitter<T>): Disposable => this.subscribe(eventType, (e: T) => otherEmitter.publish(eventType, e))
}

const eventEmitter = new EventEmitter()

export default eventEmitter

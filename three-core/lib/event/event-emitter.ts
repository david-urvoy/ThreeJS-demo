import { EventTypes } from './event-types'

type Listener<EventType extends keyof EventTypes> = EventTypes[EventType][number]

export class EventEmitter {
	private listeners: { [P in keyof EventTypes]?: EventTypes[P] } = {}
	private listenersOncer: { [P in keyof EventTypes]?: EventTypes[P] } = {}

	subscribe = <EventType extends keyof EventTypes>(eventType: EventType, listener: Listener<EventType>): Disposable => {
		this.listeners[eventType] = [...this.listeners[eventType] ?? [], listener] as EventTypes[EventType]
		return {
			[Symbol.dispose]: () => this.unsubscribe(eventType, listener)
		}
	}

	once = <EventType extends keyof EventTypes>(eventType: EventType, listener: Listener<EventType>) => this.listenersOncer[eventType] = [...this.listenersOncer[eventType] ?? [], listener] as EventTypes[EventType]

	unsubscribe = <EventType extends keyof EventTypes>(eventType: EventType, listener: Listener<EventType>) => {
		const callbackIndex = (this.listeners[eventType] as Listener<EventType>[])?.indexOf(listener) ?? -1
		if (callbackIndex > -1) this.listeners[eventType]?.splice(callbackIndex, 1)
	}

	publish = <EventType extends keyof EventTypes>(eventType: EventType, event: Parameters<Listener<EventType>>[number]) => {
		const toCall = [...this.listenersOncer[eventType] ?? [], ...this.listeners[eventType] ?? []]
		this.listenersOncer[eventType] = []
		toCall.forEach((listener: Listener<any>) => listener(event))
	}

	pipe = <EventType extends keyof EventTypes>(eventType: EventType, otherEmitter: EventEmitter): Disposable => this.subscribe(eventType, (e: any) => otherEmitter.publish(eventType, e))
}

export const eventEmitter = new EventEmitter()

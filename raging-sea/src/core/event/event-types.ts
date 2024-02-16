import { Clock } from 'three'
import { EventCommand } from '../types/commands'

export type Listener<T> = (event: T) => any

export type EventTypes = {
	tick: Listener<Clock>,
	keydown: Listener<EventCommand>
}

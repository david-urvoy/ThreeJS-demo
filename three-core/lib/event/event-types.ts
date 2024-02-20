import { Clock } from 'three'
import { EventCommand } from '../types/commands'

type Listener<T> = (event: T) => any

export type EventTypes = {
	tick: Listener<Clock>[],
	keydown: Listener<EventCommand>[]
}

// export const EventTypes: {
// 	tick: Listener<Clock>[],
// 	keydown: Listener<EventCommand>[]
// } = {
// 	tick: [],
// 	keydown: []
// } as const

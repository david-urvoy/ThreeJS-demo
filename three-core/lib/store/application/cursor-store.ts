import { createStore } from 'zustand/vanilla'
import { Coordinates2D } from '../../types/coordinates'
import { WindowStore } from './window-store'

interface CursorStore extends Coordinates2D { move: (event: MouseEvent) => void }

export const CursorStore = createStore<CursorStore>(set => ({
	x: 0, y: 0,
	move: ({ clientX, clientY }: MouseEvent) => {
		const { width, height } = WindowStore.getState()
		set(() => ({
			x: 2 * (clientX / width - .5),
			y: -2 * (clientY / height - .5)
		}))
	}
}))

document.addEventListener('mousemove', event => CursorStore.getState().move(event))

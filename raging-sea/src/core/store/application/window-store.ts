import { createStore } from 'zustand/vanilla'
import { Dimensions } from '../../types/application'

interface WindowStore extends Dimensions { resize: () => Dimensions }

export const WindowStore = createStore<WindowStore>(set => ({
	width: window.innerWidth, height: window.innerHeight,
	resize: () => {
		const dimensions = { width: window.innerWidth, height: window.innerHeight }
		set(() => dimensions)
		return dimensions
	}
}))

window.addEventListener('resize', () => WindowStore.getState().resize())

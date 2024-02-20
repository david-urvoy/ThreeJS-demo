import { createStore } from 'zustand/vanilla'
import { eventEmitter } from '../../event/event-emitter'
import { DirectionalCommand, DirectionalCommands, EventCommand, KEYMAP } from '../../types/commands'

interface KeyboardStore {
	directions: { [key in DirectionalCommand]?: true },
	_press: (command: DirectionalCommand) => void,
	_release: (commands: DirectionalCommand) => void
}

export const KeyboardStore = createStore<KeyboardStore>((set, get) => ({
	directions: {},
	settings: {},
	_press: command => {
		const { directions } = get()
		if (DirectionalCommands.includes(command) && !(command in directions)) {
			directions[command] = true
			set({ directions })
		}
	},
	_release: command => {
		const directions = get().directions
		if (DirectionalCommands.includes(command) && (command in directions)) {
			delete directions[command]
			set({ directions })
		}
	},
}))

window.addEventListener('keydown', ({ key }) => {
	const command = KEYMAP.get(key)
	if (command) {
		if (DirectionalCommands.includes(command as DirectionalCommand)) KeyboardStore.getState()._press(command as DirectionalCommand)
		else eventEmitter.publish('keydown', command as EventCommand)
	}
})
window.addEventListener('keyup', ({ key }) => {
	const command = KEYMAP.get(key)
	command && DirectionalCommands.includes(command as DirectionalCommand) && KeyboardStore.getState()._release(command as DirectionalCommand)
})

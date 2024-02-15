import { createStore } from 'zustand/vanilla'
import { DirectionalCommand, DirectionalCommands, EventCommand, KEYMAP } from '../../types/commands'
import eventEmitter from '../../event/event-emitter'

interface KeyboardStore {
	directions: { [key in DirectionalCommand]?: true },
	press: (command: DirectionalCommand) => void,
	release: (commands: DirectionalCommand) => void
}

export const KeyboardStore = createStore<KeyboardStore>((set, get) => ({
	directions: {},
	settings: {},
	press: command => {
		const { directions } = get()
		if (DirectionalCommands.includes(command) && !(command in directions)) {
			directions[command] = true
			set({ directions })
		}
	},
	release: command => {
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
		if (DirectionalCommands.includes(command as DirectionalCommand)) KeyboardStore.getState().press(command as DirectionalCommand)
		else eventEmitter.publish('keydown', command as EventCommand)
	}
})
window.addEventListener('keyup', ({ key }) => {
	const command = KEYMAP.get(key)
	command && DirectionalCommands.includes(command as DirectionalCommand) && KeyboardStore.getState().release(command as DirectionalCommand)
})

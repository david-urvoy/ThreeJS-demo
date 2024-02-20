export const DirectionalCommands = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const
export type DirectionalCommand = typeof DirectionalCommands[number]

export const SettingsCommands = ['FULL_SCREEN'] as const
export type SettingsCommand = typeof SettingsCommands[number]

export const KEYMAP = new Map<string, Command>([
	['z', 'UP'],
	['s', 'DOWN'],
	['q', 'LEFT'],
	['d', 'RIGHT'],
	['F6', 'FULL_SCREEN']
])

export type Command = DirectionalCommand | SettingsCommand
export type StoreCommand = DirectionalCommand
export type EventCommand = SettingsCommand

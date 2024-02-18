import GUI from 'lil-gui'

export const debugGUI = new GUI({
	title: 'Debug',
	// closeFolders: true
})
// .close()
// .hide()

// debugGUI._closeFolders = true

window.addEventListener('keydown', ({ key, altKey }) => key === '∂' && altKey && debugGUI.show(debugGUI._hidden))

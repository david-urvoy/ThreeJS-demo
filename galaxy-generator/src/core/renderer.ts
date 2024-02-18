import { WebGLRenderer } from 'three'
import { WebGL } from 'three/examples/jsm/Addons.js'
import { camera } from './camera'
import eventEmitter from './event/event-emitter'
import { scene } from './scene'
import { WindowStore } from './store/application/window-store'
import { stats } from './debug/monitor'

export const canvas = document.getElementById("game-canvas") ?? undefined

export class AnimatedRenderer extends WebGLRenderer {

	constructor () {
		if (!WebGL.isWebGLAvailable()) document.getElementById('container')?.appendChild(WebGL.getWebGLErrorMessage())

		stats.begin()
		super({ canvas })

		this.setSize(window.innerWidth, window.innerHeight)
		this.shadowMap.enabled = true

		WindowStore.subscribe(({ width, height }) => {
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			this.setSize(width, height)
			this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})
		eventEmitter.subscribe('keydown', event => {
			if (event === 'FULL_SCREEN') {
				if (!document.fullscreenElement) canvas?.requestFullscreen()
				else document.exitFullscreen()
			}
		})

		eventEmitter.subscribe('tick', () => this.render(scene, camera))
		stats.end()
	}

}

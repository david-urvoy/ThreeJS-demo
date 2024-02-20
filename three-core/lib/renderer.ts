import { Clock, WebGLRenderer } from 'three'
import { WebGL } from 'three/examples/jsm/Addons.js'
import { Camera } from './camera'
import { stats } from './debug/monitor'
import { eventEmitter } from './event/event-emitter'
import { scene } from './scene'
import { WindowStore } from './store/application/window-store'
import { Dimensions, PIXEL_RATIO } from './types/application'

type RendererParameters = NonNullable<ConstructorParameters<typeof WebGLRenderer>[0]> & { onTick?: (clock: Clock) => void }

export class AnimatedRenderer extends WebGLRenderer {

	constructor (private camera: Camera, rendererParameters: RendererParameters) {
		if (!WebGL.isWebGLAvailable()) document.getElementById('container')?.appendChild(WebGL.getWebGLErrorMessage())

		super(rendererParameters)

		this.setSize(window.innerWidth, window.innerHeight)
		this.shadowMap.enabled = true

		const clock = new Clock()
		const tick = () => {
			import.meta.env.DEV && stats.begin()

			eventEmitter.publish('tick', clock)
			rendererParameters.onTick?.(clock)
			camera.controls.update()
			this.render(scene, camera)
			requestAnimationFrame(tick.bind(this))

			import.meta.env.DEV && stats.end()
		}
		tick()

		// Resize
		WindowStore.subscribe(dimensions => this._handleResize(dimensions))
		// Fullscreen
		rendererParameters.canvas instanceof HTMLCanvasElement
			&& eventEmitter.subscribe('keydown', event => (event === 'FULL_SCREEN') && this._handleFullscreen(rendererParameters.canvas))
	}

	private _handleResize({ width, height }: Dimensions) {
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.setSize(width, height)
		this.setPixelRatio(PIXEL_RATIO)
	}

	private _handleFullscreen = (canvas: RendererParameters['canvas']) => !document.fullscreenElement ? (canvas as HTMLCanvasElement)?.requestFullscreen()
		: document.exitFullscreen()
}

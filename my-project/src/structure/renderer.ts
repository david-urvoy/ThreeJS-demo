import { Clock, WebGLRenderer, WebGLRendererParameters } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import { camera, controls } from './camera'
import { canvas, dimensions } from './defaults'
import { scene } from './scene'

type Animation = (delta: number, elapsedTime: number) => void

const cursor = { x: 0, y: 0 }
const clock = new Clock()

export class AnimatedRenderer extends WebGLRenderer {

	private animation?: Animation

	constructor ({ animation = () => { }, ...parameters }: WebGLRendererParameters & { animation?: Animation }) {
		if (!WebGL.isWebGLAvailable()) document.getElementById('container')?.appendChild(WebGL.getWebGLErrorMessage())

		super({ canvas, ...parameters })

		this.animation = animation
		this.setSize(window.innerWidth, window.innerHeight)
		this.shadowMap.enabled = true

		document.addEventListener('mousemove', ({ clientX, clientY }) => {
			cursor.x = 2 * (clientX / dimensions.width - .5)
			cursor.y = -2 * (clientY / dimensions.height - .5)
		})
		window.addEventListener('resize', _ => {
			dimensions.width = window.innerWidth
			dimensions.height = window.innerHeight

			camera.aspect = dimensions.width / dimensions.height
			camera.updateProjectionMatrix()
			this.setSize(dimensions.width, dimensions.height)
			this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})
		window.addEventListener('dblclick', () => {
			if (!document.fullscreenElement) canvas?.requestFullscreen()
			else document.exitFullscreen()
		})
	}

	start() {
		this.animation?.(clock.getDelta(), clock.getElapsedTime())

		controls.update()
		this.render(scene, camera)

		requestAnimationFrame(this.start.bind(this))
	}

}


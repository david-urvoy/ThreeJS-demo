import { Clock, WebGLRenderer, WebGLRendererParameters } from 'three'
import { canvas, dimensions } from './defaults'
import { camera, controls } from './camera'
import { scene } from './scene'

type Animation = (time: number) => void

export class AnimatedRenderer extends WebGLRenderer {

	private animation?: Animation

	constructor ({ animation, ...parameters }: WebGLRendererParameters & { animation?: Animation }) {
		super(parameters)
		this.animation = animation
		this.setSize(window.innerWidth, window.innerHeight)
		this.shadowMap.enabled = true


		const cursor = { x: 0, y: 0 }

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

	setAnimation(animation: Animation) {
		this.animation = animation
		return this
	}

	clock = new Clock()

	animate() {
		requestAnimationFrame(this.animate.bind(this))

		this.animation?.(this.clock.getElapsedTime())

		controls.update()
		this.render(scene, camera)
	}

}

const threeRenderer = new AnimatedRenderer({ canvas })

export const renderer = {
	...threeRenderer,
	animate: () => console.log('animation')
}


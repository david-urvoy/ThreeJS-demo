import { Clock } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import { camera, controls } from './camera'
import { renderer } from './renderer'
import { scene } from './scene'

export default function animate(callback: (time: number) => void) {
	const clock = new Clock()
	function animate() {
		requestAnimationFrame(animate)

		callback(clock.getElapsedTime())

		controls.update()
		renderer.render(scene, camera)
	}
	WebGL.isWebGLAvailable() ? animate() : document.getElementById('container')?.appendChild(WebGL.getWebGLErrorMessage())
}

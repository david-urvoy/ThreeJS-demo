import { AxesHelper, BoxGeometry, BufferAttribute, BufferGeometry, Clock, Group, Mesh, MeshBasicMaterial, Points, PointsMaterial } from 'three'
import { camera } from './core/camera'
import chronometer from './core/chronometer'
import { controls } from './core/controls'
import { debugGUI } from './core/debug-gui'
import eventEmitter from './core/event/event-emitter'
import { AnimatedRenderer } from './core/renderer'
import { scene } from './core/scene'

scene.add(new AxesHelper(.2))

const debugWinter = {
	snowflakesCount: 1,
	snowflakesSize: .05,
	snowflakesDelayMs: 10,
	sceneSize: 5,
	speed: 1
}

const randomPosition = () => (Math.random() - .5)
const snowflakeOscillation = (elapsedTime: number, delta: number, ratio: number) => Math.sin(elapsedTime * ratio * Math.PI * 2) * 2.5 * ratio * delta

const snowflakes = new Points(new BufferGeometry(), new PointsMaterial({ color: 'white', size: debugWinter.snowflakesSize, sizeAttenuation: true }))

let snowflakesPositions: [number, number, number, number, number][] = []
const updateSnowflakesPositions = (clock: Clock) => {
	const elapsedTime = clock.elapsedTime
	const delta = clock.getDelta()
	snowflakesPositions = snowflakesPositions
		.filter(([_, y]) => y > -debugWinter.sceneSize / 2)
		.map(([x, y, z, xRatio, zRatio]) => [x + snowflakeOscillation(elapsedTime, delta, xRatio), y - delta * debugWinter.speed, z + snowflakeOscillation(elapsedTime, delta, zRatio), xRatio, zRatio])
	snowflakes.geometry = new BufferGeometry()
	snowflakes.geometry.setAttribute('position', new BufferAttribute(new Float32Array(snowflakesPositions.flatMap(([x, y, z]) => [x, y, z])), 3))
}

const cube = new Mesh(undefined, new MeshBasicMaterial({ wireframe: true }))

let batchSnowflakes: number
const braceYourselves = ({ sceneSize, snowflakesSize, snowflakesDelayMs }: { sceneSize: number, snowflakesSize: number, snowflakesDelayMs: number }) => {

	if (sceneSize) {
		cube.geometry.dispose()
		cube.geometry = new BoxGeometry(sceneSize, sceneSize, sceneSize)
	}
	if (snowflakesSize) {
		snowflakes.material.dispose()
		snowflakes.material = new PointsMaterial({ color: 'white', size: snowflakesSize, sizeAttenuation: true })
	}
	if (snowflakesDelayMs) {
		clearInterval(batchSnowflakes)
		batchSnowflakes = setInterval(() => {
			snowflakesPositions.push(
				...[...Array(debugWinter.snowflakesCount)]
					.map(() => ([randomPosition() * sceneSize, sceneSize / 2, randomPosition() * sceneSize, randomPosition(), randomPosition()] as [number, number, number, number, number]))
			)
			snowflakes.geometry.dispose()
			snowflakes.geometry = new BufferGeometry()
			snowflakes.geometry.setAttribute('position', new BufferAttribute(new Float32Array(snowflakesPositions.flatMap(([x, y, z]) => [x, y, z])), 3))

		}, snowflakesDelayMs)
	}

	const winter = new Group().add(snowflakes, cube)
	scene.add(winter)
}

braceYourselves(debugWinter)

eventEmitter.subscribe('tick', updateSnowflakesPositions)

debugGUI.add(debugWinter, 'snowflakesCount').min(10).max(1000).step(10)
debugGUI.add(debugWinter, 'snowflakesDelayMs').min(4).max(100).step(1)
	.onFinishChange((snowflakesDelayMs: number) => braceYourselves({ ...debugWinter, snowflakesDelayMs }))
debugGUI.add(camera.position, 'z').min(0).max(10).step(1).name('zoom')
debugGUI.add(debugWinter, 'snowflakesSize').min(.01).max(.1).step(.01)
	.onFinishChange((snowflakesSize: number) => braceYourselves({ ...debugWinter, snowflakesSize }))
debugGUI.add(debugWinter, 'speed').min(1).max(10).step(1)
debugGUI.add(debugWinter, 'sceneSize').min(1).max(10).step(1)
	.onFinishChange((sceneSize: number) => braceYourselves({ ...debugWinter, sceneSize }))

controls.update()
new AnimatedRenderer()
chronometer.tick()

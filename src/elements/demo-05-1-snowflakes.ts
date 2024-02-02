import { AxesHelper, BoxGeometry, BufferAttribute, BufferGeometry, Group, Mesh, MeshBasicMaterial, Points, PointsMaterial } from 'three'
import { AnimatedRenderer } from '../structure/renderer'
import { scene } from '../structure/scene'

const SNOWFLAKE_DELAY_MS = 50
export const SCENE_DIMENSIONS = { x: 50, y: 50, z: 50 }

const randomPosition = (size: number) => (Math.random() - .5) * size

scene.add(new AxesHelper(1))

const snowflakesGeometry = new BufferGeometry()
const snowflakesMaterial = new PointsMaterial({ color: 'white', size: .2, sizeAttenuation: true })

const snowflakes = new Points(snowflakesGeometry, snowflakesMaterial)
export const winter = new Group().add(snowflakes, new Mesh(new BoxGeometry(SCENE_DIMENSIONS.x, SCENE_DIMENSIONS.y, SCENE_DIMENSIONS.z), new MeshBasicMaterial({ wireframe: true })))

let snowflakesPositions: [number, number, number, number, number][] = []
setInterval(() => {
	snowflakesPositions.push(
		...[...Array(100)].map(() => ([randomPosition(SCENE_DIMENSIONS.x), SCENE_DIMENSIONS.y / 2, randomPosition(SCENE_DIMENSIONS.z), Math.random() - .5, Math.random() - .5] as [number, number, number, number, number]))
	)
	snowflakesGeometry.dispose()
	snowflakes.geometry = new BufferGeometry()
	snowflakes.geometry.setAttribute('position', new BufferAttribute(new Float32Array(snowflakesPositions.flatMap(([x, y, z]) => [x, y, z])), 3))

}, SNOWFLAKE_DELAY_MS)

new AnimatedRenderer({
	animation: (delta, elapsedTime) => {
		snowflakesPositions = snowflakesPositions
			.filter(([_, y]) => y > -SCENE_DIMENSIONS.y / 2)
			.map(([x, y, z, xRatio, zRatio]) => [x + Math.sin(elapsedTime * xRatio * 10) * delta, y - delta, z + Math.sin(elapsedTime * zRatio * 10) * delta, xRatio, zRatio])
		snowflakes.geometry = new BufferGeometry()
		snowflakes.geometry.setAttribute('position', new BufferAttribute(new Float32Array(snowflakesPositions.flatMap(([x, y, z]) => [x, y, z])), 3))
	}
}).start()

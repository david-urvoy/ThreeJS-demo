import { BoxGeometry, CameraHelper, Color, ConeGeometry, Fog, Group, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PlaneGeometry, PointLight, SphereGeometry } from 'three'
import { debugGUI, eventEmitter, setupEnvironment } from 'three-core'
import { scene } from 'three-core/lib/scene'
import { Lights } from './lights'
import { Textures } from './textures'

const HauntedHouseState = {
	rotation: false,
	fogColor: '#262837'
}

/**
 * Objects
 */

const floor = new Mesh(new PlaneGeometry(20, 20), new MeshStandardMaterial({
	map: Textures.grass.color,
	aoMap: Textures.grass.ambientOcclusion,
	normalMap: Textures.grass.normal,
	roughnessMap: Textures.grass.roughness
}))
	.rotateX(-Math.PI / 2)

// HOUSE
const walls = new Mesh(new BoxGeometry(4, 2.5, 4), new MeshStandardMaterial({
	map: Textures.bricks.color,
	aoMap: Textures.bricks.ambientOcclusion,
	normalMap: Textures.bricks.normal,
	roughnessMap: Textures.bricks.roughness
}))
walls.translateY(walls.geometry.parameters.height / 2 - .01)
const wallsDepth = walls.geometry.parameters.depth / 2

const roof = new Mesh(new ConeGeometry(3.5, 1, 4), new MeshStandardMaterial({ color: '#b35f45' }))
roof.translateY(walls.geometry.parameters.height + roof.geometry.parameters.height / 2)
	.rotateY(Math.PI * .25)

const door = new Mesh(new PlaneGeometry(2.2, 2.2, 100, 100), new MeshStandardMaterial({
	map: Textures.door.color,
	transparent: true,
	alphaMap: Textures.door.alpha,
	aoMap: Textures.door.ambientOcclusion,
	displacementMap: Textures.door.height,
	displacementScale: .1,
	normalMap: Textures.door.normal,
	metalnessMap: Textures.door.metalness,
	roughnessMap: Textures.door.roughness
}))
door.translateZ(wallsDepth + .01)
	.translateY(door.geometry.parameters.height / 2)

const bushGeometry = new SphereGeometry(1, 16, 16)
const bushMaterial = new MeshStandardMaterial({ color: '#89c854' })
const bushes = [...Array(4)].map(() => new Mesh(bushGeometry, bushMaterial))

bushes[0].scale.set(.5, .5, .5)
bushes[0].position.set(.8, .2, 2.2)

bushes[1].scale.set(.25, .25, .25)
bushes[1].position.set(1.4, .1, 2.1)

bushes[2].scale.set(.4, .4, .4)
bushes[2].position.set(-.8, .1, 2.2)

bushes[3].scale.set(.15, .15, .15)
bushes[3].position.set(-1, .05, 2.6)

const house = new Group().add(walls, roof, door, ...bushes)

// Cemetery
const graveMaterial = new MeshStandardMaterial({ color: '#b2b6b1' })
const graveGeometry = new BoxGeometry(.6, .8, .2)

const graves = [...Array(50)].map(() => {
	const randomRatio = Math.random() * .4 + .8
	const angle = Math.random() * Math.PI * 2
	const distance = Math.random() * 7 + 3
	const grave = new Mesh(graveGeometry, graveMaterial)
		.rotateY(Math.random() * Math.PI)
		.translateY(.4 * randomRatio)
		.translateX(Math.cos(angle) * distance)
		.translateZ(Math.sin(angle) * distance)
	grave.scale.set(randomRatio, randomRatio, randomRatio)
	grave.castShadow = true
	return grave
}
)

/**
 * Lights
 */
house.children.forEach(child => child.receiveShadow = true)
house.children.forEach(child => child.castShadow = true)
floor.receiveShadow = true

const { directionalLight: moonLight, ambientLight } = { ...Lights }
ambientLight.color.set(0xb9d5ff)
ambientLight.intensity = .12

moonLight.color.set(0xb9d5ff)
moonLight.intensity = .26
moonLight.castShadow = true
moonLight.position.set(-5, 4, -3)
moonLight.target = floor

const doorLight = new PointLight('#ff7d46', 1, 7)
doorLight.position.set(door.position.x, door.position.y + 1.25, door.position.z + .8)
doorLight.castShadow = true

const lightCamera = new CameraHelper(moonLight.shadow.camera)
lightCamera.visible = false

/**
 * Ghosts
 */
const ghost1 = new PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new PointLight('#00ffff', 6, 3)
scene.add(ghost2)

const ghost3 = new PointLight('#ffff00', 6, 3)
scene.add(ghost3)

const cemetery = new Group().add(...graves)
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

/**
 * Scene
*/
scene.add(floor)
scene.add(moonLight, ambientLight, lightCamera)

const { renderer } = setupEnvironment({ canvas: document.getElementById('demo-canvas') as HTMLCanvasElement, position: { y: 3, z: 12 } })
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true

renderer.shadowMap.type = PCFSoftShadowMap

scene.fog = new Fog(new Color(HauntedHouseState.fogColor), 1, 15)

/**
 * Run
 */
export const HAUNTED_HOUSE = new Group().add(floor, house, cemetery, doorLight)
scene.add(HAUNTED_HOUSE)
eventEmitter.subscribe('tick', time => {
	if (HauntedHouseState.rotation) HAUNTED_HOUSE.rotation.y = Math.PI * .01 * time.getElapsedTime()

	// Ghosts
	const elapsedTime = time.getElapsedTime()
	const ghost1Angle = elapsedTime * 0.5
	ghost1.position.x = Math.cos(ghost1Angle) * 4
	ghost1.position.z = Math.sin(ghost1Angle) * 4
	ghost1.position.y = Math.sin(elapsedTime * 3)

	const ghost2Angle = - elapsedTime * 0.32
	ghost2.position.x = Math.cos(ghost2Angle) * 5
	ghost2.position.z = Math.sin(ghost2Angle) * 5
	ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

	const ghost3Angle = - elapsedTime * 0.18
	ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
	ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
	ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

})

/**
 * Debug
 */
const debugHauntedHouse = debugGUI.addFolder('Haunted House')
debugHauntedHouse.add(ambientLight, 'intensity').name('Ambient light')
	.min(0).max(1).step(.01)
debugHauntedHouse.add(moonLight, 'intensity').name('Directional light')
	.min(0).max(1).step(.01)
debugHauntedHouse.add(moonLight.position, 'x').min(-30).max(30).step(.5)
debugHauntedHouse.add(moonLight.position, 'y').min(5).max(20).step(.5)
debugHauntedHouse.add(moonLight.position, 'z').min(-30).max(30).step(.5)
debugHauntedHouse.add(HauntedHouseState, 'rotation')
debugHauntedHouse.addColor(HauntedHouseState, 'fogColor')
	.onFinishChange((color: Color) => scene.fog?.color.set(new Color(color)))


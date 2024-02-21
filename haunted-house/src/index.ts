import { BoxGeometry, CameraHelper, Color, ConeGeometry, Fog, Group, Mesh, MeshLambertMaterial, MeshStandardMaterial, PlaneGeometry, SphereGeometry } from 'three'
import { debugGUI, eventEmitter, setupEnvironment } from 'three-core'
import { scene } from 'three-core/lib/scene'
import { Lights } from './lights'
import { Textures } from './textures'

const HauntedHouseState = {
	rotation: true,
	fogColor: '#ffffff'
}

/**
 * Objects
 */

const floor = new Mesh(new PlaneGeometry(20, 20), new MeshLambertMaterial({ map: Textures.grass, alphaMap: Textures.grass }))
	.rotateX(-Math.PI / 2)

// HOUSE
const walls = new Mesh(new BoxGeometry(4, 2.5, 4), new MeshStandardMaterial({ color: '#ac8e82' }))
walls.translateY(walls.geometry.parameters.height / 2 - .01)
const wallsDepth = walls.geometry.parameters.depth / 2

const roof = new Mesh(new ConeGeometry(3.5, 1, 4), new MeshStandardMaterial({ color: '#b35f45' }))
roof.translateY(walls.geometry.parameters.height + roof.geometry.parameters.height / 2)
	.rotateY(Math.PI * .25)

const door = new Mesh(new PlaneGeometry(1.5, 2.2), new MeshStandardMaterial({ map: Textures.colorTexture, transparent: true, alphaMap: Textures.alphaTexture }))
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
	return grave
}
)

const cemetery = new Group().add(...graves)

/**
 * Lights
 */
house.children.forEach(child => child.receiveShadow = true)
house.children.forEach(child => child.castShadow = true)
floor.receiveShadow = true

const { directionalLight, ambientLight } = { ...Lights }
directionalLight.castShadow = true

directionalLight.position.set(-30, 20, 0)
directionalLight.target = roof

const lightCamera = new CameraHelper(directionalLight.shadow.camera)
lightCamera.visible = false

/**
 * Scene
*/
scene.add(floor)
scene.add(directionalLight, ambientLight, lightCamera)

setupEnvironment({ canvas: document.getElementById('demo-canvas') as HTMLCanvasElement, position: { y: 3, z: 12 } })

/**
 * Run
 */
export const HAUNTED_HOUSE = new Group().add(floor, house, cemetery)
scene.add(HAUNTED_HOUSE)
eventEmitter.subscribe('tick', time => {
	if (HauntedHouseState.rotation) HAUNTED_HOUSE.rotation.y = Math.PI * .01 * time.getElapsedTime()
}
)

scene.fog = new Fog(new Color(HauntedHouseState.fogColor), 0, 12)

/**
 * Debug
 */
const debugHauntedHouse = debugGUI.addFolder('Haunted House')
debugHauntedHouse.add(ambientLight, 'intensity').name('Ambient light')
	.min(0).max(1).step(.01)
debugHauntedHouse.add(directionalLight, 'intensity').name('Directional light')
	.min(0).max(1).step(.01)
debugHauntedHouse.add(directionalLight.position, 'x').min(-30).max(30).step(.5)
debugHauntedHouse.add(directionalLight.position, 'y').min(5).max(20).step(.5)
debugHauntedHouse.add(directionalLight.position, 'z').min(-30).max(30).step(.5)
debugHauntedHouse.add(HauntedHouseState, 'rotation')
debugHauntedHouse.addColor(HauntedHouseState, 'fogColor')
	.onFinishChange((color: Color) => scene.fog?.color.set(new Color(color)))


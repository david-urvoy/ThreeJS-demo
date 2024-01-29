import gsap from 'gsap'
import * as THREE from 'three'
import { debugGUI } from '../structure/debug-gui'
import { alphaTexture, ambientOcclusionTexture, colorTexture, heightTexture, metalnessTexture, normalTexture, roughnessTexture } from './textures'

const debugObject = {
	cube1Material: {
		color: 'darkred'
	},
	subdivision: 2
}

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ ...debugObject.cube1Material, wireframe: true }))
	.add(new THREE.AxesHelper(2))
const colorCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: colorTexture }))
	.translateX(1)
const alphaCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: alphaTexture }))
	.translateY(1)
const heightCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: heightTexture }))
	.translateX(2)
const ambientCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: ambientOcclusionTexture }))
	.translateX(-1)
const metalCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: metalnessTexture }))
	.translateX(-2)
const roughCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: roughnessTexture }))
	.translateOnAxis(new THREE.Vector3(-2, -1, 0), 1)
const normalCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: normalTexture }))
	.translateOnAxis(new THREE.Vector3(-2, 1, 0), 1)
const plasmaCannon = new THREE.Mesh(new THREE.ConeGeometry(.5, 1, 50), new THREE.MeshBasicMaterial({ map: colorTexture }))
	.translateX(3)
	.rotateZ(- Math.PI / 2)

const actions = {
	spin: () => gsap.to(spaceShip.rotation, { duration: 1, delay: .2, x: spaceShip.rotation.x + Math.PI * 2 })
}

const debugSpaceship = debugGUI.addFolder('Spaceship')

debugSpaceship.add(plasmaCannon.position, 'x')
	.min(3)
	.max(10)
	.step(.01)
	.name('Fire cannon')
debugSpaceship.add(cube1, 'visible')
debugSpaceship.add(cube1.material, 'wireframe')
debugSpaceship.addColor(debugObject.cube1Material, 'color')
	.onChange(_ => cube1.material.color.set(debugObject.cube1Material.color))
debugSpaceship.add(actions, 'spin')
debugSpaceship.add(debugObject, 'subdivision')
	.min(1)
	.max(20)
	.step(1)
	.onFinishChange(_ => {
		cube1.geometry.dispose()
		cube1.geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
	})

export const spaceShip = new THREE.Group().add(
	cube1, colorCube, alphaCube, heightCube, ambientCube, metalCube, roughCube, normalCube, plasmaCannon
)

// const shape = new THREE.BufferGeometry()
// shape.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
// 	0, 0, 0,
// 	0, 2, 0,
// 	1, 1, 1,
// ]), 3))
// scene.add(new THREE.Mesh(shape, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })))




// Animation
// spaceShip.position.x = Math.cos(elapsedTime) * 3
// spaceShip.position.y = Math.sin(elapsedTime) * 3
// camera.lookAt(spaceShip.position)

// // Camera update (implement control)
// camera.position.x = - 3 * (Math.sin(cursor.x * Math.PI))
// camera.position.z = 3 * (Math.cos((cursor.x + .5 * cursor.y) * Math.PI))
// camera.position.y = - 3 * Math.sin(cursor.y * .5 * Math.PI)
// camera.lookAt(spaceShip.position)

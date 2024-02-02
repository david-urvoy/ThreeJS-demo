import { Body, Box, ContactMaterial, Material, Plane, SAPBroadphase, Vec3, World } from 'cannon'
import { BoxGeometry, DirectionalLightHelper, Group, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from 'three'
import { debugGUI } from '../structure/debug-gui'
import { AnimatedRenderer } from '../structure/renderer'
import { scene } from '../structure/scene'
import { Lights } from './lights'
import { Textures } from './textures'

const hitSound = new Audio('/sounds/hit.mp3')

const physicsState = {
	create: () => createCube(Math.random() * 3, new Vector3(0, 10, 0))
}
debugGUI.add(physicsState, 'create')

const plane = new Mesh(new PlaneGeometry(20, 20), new MeshStandardMaterial({ color: 'grey' }))
	.rotateX(-Math.PI * .5)
const physicsGroup = new Group().add(plane)

const floorBody = new Body({ shape: new Plane(), mass: 0 })
floorBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI * .5)

const cubeGeometry = new BoxGeometry(1, 1, 1)
const cubeMaterial = new MeshStandardMaterial({ metalness: .3, roughness: .4, envMap: Textures.environmentMaps })

const physicsMaterial = new Material('default')
const contactMaterial = new ContactMaterial(physicsMaterial, physicsMaterial, {
	friction: .1, restitution: .7
})
const physicsWorld = new World()
physicsWorld.gravity.set(0, -9.82, 0)
physicsWorld.broadphase = new SAPBroadphase(physicsWorld)
physicsWorld.allowSleep = true
physicsWorld.addBody(floorBody)
physicsWorld.defaultContactMaterial = contactMaterial

let cubes: { mesh: Mesh, body: Body }[] = []
const createCube = (size: number, { x, y, z }: Vector3) => {
	const mesh = new Mesh(cubeGeometry, cubeMaterial)
	mesh.position.set(x, y, z)
	mesh.scale.set(size, size, size)
	mesh.castShadow = true

	const cubeShape = new Box(new Vec3(size / 2, size / 2, size / 2))
	const body = new Body({ mass: 1, shape: cubeShape, position: new Vec3(x, y, z) })
	physicsWorld.addBody(body)
	// body.applyLocalForce(new Vec3(150, 0, 0), new Vec3(0, 0, 0))

	cubes.push({ mesh, body })
	scene.add(mesh)
}

Lights.directionalLight.castShadow = true
Lights.directionalLight.shadow.mapSize.set(1024, 1024)
Lights.directionalLight.shadow.camera.far = 15
Lights.directionalLight.shadow.camera.left = -10
Lights.directionalLight.shadow.camera.top = 10
Lights.directionalLight.shadow.camera.right = 10
Lights.directionalLight.shadow.camera.bottom = -10
Lights.directionalLight.intensity = 1
plane.receiveShadow = true
Lights.directionalLight.translateY(10)
Lights.directionalLight.intensity = 1

scene.add(physicsGroup, Lights.directionalLight, new DirectionalLightHelper(Lights.directionalLight))

export const physicsAnimation = new AnimatedRenderer({
	animation: ({ delta }) => {
		// cubeBody.applyForce(new Vec3(-.5, 0, 0), new Vec3(0, 0, 0))
		physicsWorld.step(1 / 60, delta, 3)
		cubes.forEach(({ mesh, body }) => {
			mesh.position.set(body.position.x, body.position.y, body.position.z)
			mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
		})
	}
})

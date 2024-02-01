import { AmbientLight, BoxGeometry, Group, Mesh, MeshLambertMaterial, PlaneGeometry, SphereGeometry, TorusGeometry } from 'three'
import { camera } from '../structure/camera'
import { AnimatedRenderer } from '../structure/renderer'
import { scene } from '../structure/scene'
import { Lights } from './lights'
import { Textures } from './textures'

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial({ color: 'grey' }))
	.rotateX(-Math.PI * .5)

const cube = new Mesh(new BoxGeometry(2.5, 2.5, 2.5), new MeshLambertMaterial({ map: Textures.colorTexture }))
const torus = new Mesh(new TorusGeometry(1, .5), new MeshLambertMaterial({ color: '#c3189e' }))
	.translateX(5)
const sphere = new Mesh(new SphereGeometry(1.4), new MeshLambertMaterial({ color: '#174a0d' }))
	.translateX(-5)

plane.receiveShadow = true
Lights.spotLight.castShadow = true
Lights.spotLight.shadow.mapSize.set(1024, 1024)
cube.castShadow = true
cube.receiveShadow = true
torus.castShadow = true
torus.receiveShadow = true
sphere.castShadow = true
sphere.receiveShadow = true

camera.position.set(0, 5, 12)
Lights.spotLight.position.set(0, 8, 6)
Lights.spotLight.lookAt(plane.position)
scene.add(Lights.spotLight, new AmbientLight(0xffffff, .1))

const shapes = new Group().add(cube, torus, sphere).translateY(5)
export const shadowDemo = new Group().add(plane, shapes)

new AnimatedRenderer({
	animation: ((time: number) => {
		const rotation = time * Math.PI * .05
		cube.rotation.set(rotation, rotation, 0)
		torus.rotation.set(-rotation + Math.PI / 3, rotation, 0)
	})
}).start()


// debugLight.add(shapes.position, 'y')
// 	.min(3).max(12).step(.5)

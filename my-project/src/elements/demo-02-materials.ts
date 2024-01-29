import { AxesHelper, BackSide, Clock, Color, DoubleSide, EquirectangularReflectionMapping, FrontSide, Group, Mesh, MeshPhysicalMaterial, NearestFilter, PlaneGeometry, SphereGeometry, Texture, TorusGeometry, Vector2 } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { camera, controls } from '../structure/camera'
import { debugGUI } from '../structure/debug-gui'
import { renderer } from '../structure/renderer'
import { scene } from '../structure/scene'
import { Textures } from './textures'

const DEFAULT_COLOR = new Color(0xffffff)

const material = new MeshPhysicalMaterial({
	map: Textures.colorTexture, aoMap: Textures.ambientOcclusionTexture,
	transparent: true, side: FrontSide,
	metalness: 1, roughness: 1,
	metalnessMap: Textures.metalnessTexture, roughnessMap: Textures.roughnessTexture,
	displacementMap: Textures.heightTexture,
	displacementScale: .1,
	normalMap: Textures.normalTexture, normalScale: new Vector2(.5, .5),
	alphaMap: Textures.alphaTexture,
	clearcoat: 0, clearcoatRoughness: 0,
	sheen: 0, sheenRoughness: 0, sheenColor: new Color(1, 1, 1),
	iridescence: 0, iridescenceIOR: 0, iridescenceThicknessRange: [100, 800],
	transmission: 0, ior: 1.5, thickness: .5
})

export const sphere = new Mesh(new SphereGeometry(1, 16, 16), material)
	.translateX(-4)
	.add(new AxesHelper(1))
export const plane = new Mesh(new PlaneGeometry(3, 3, 100, 100), material)
export const torus = new Mesh(new TorusGeometry(.3, .2, 64, 128), material)
	.translateX(4)

export const demo = new Group().add(sphere, plane, torus)

/**
 * ENVIRONMENT
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', environmentMap => {
	environmentMap.mapping = EquirectangularReflectionMapping
	scene.background = environmentMap
	scene.environment = environmentMap
})

const debugObject = {
	material: { map: Textures.colorTexture, alphaMap: Textures.colorTexture },
	rotation: false
}
/**
 * ROTATION
 */
const clock = new Clock()
function animate() {
	requestAnimationFrame(animate)

	if (debugObject.rotation) {
		const rotationAngle = clock.getDelta() * .05 * Math.PI
		sphere.rotation.x += -rotationAngle * 1.3
		plane.rotation.x += -rotationAngle * 1.3
		torus.rotation.x += -rotationAngle * 1.3
		sphere.rotation.y += rotationAngle
		plane.rotation.y += rotationAngle
		torus.rotation.y += rotationAngle

	}
	controls.update()
	renderer.render(scene, camera)
}
WebGL.isWebGLAvailable() ? animate() : document.getElementById('container')?.appendChild(WebGL.getWebGLErrorMessage())

/**
 * DEBUG
 */
export const debugDemo = debugGUI.addFolder('Demo')
debugDemo.close()
debugDemo.add(debugObject, 'rotation')
debugDemo.add(sphere.geometry.parameters, 'radius', { Small: 1, Big: 2 })
	.onFinishChange((size: number) => {
		sphere.geometry.dispose()
		sphere.geometry = new SphereGeometry(size, 32, 32)
	})

debugDemo.add(material, 'wireframe')

debugDemo.add(material, 'side', {
	front: FrontSide,
	back: BackSide,
	double: DoubleSide,
})

const metalness = debugDemo.addFolder('Metalness')
metalness.add(material, 'metalness')
	.min(0).max(1).step(.01)
metalness.add(material, 'roughness')
	.min(0).max(1).step(.01)

const clearcoat = debugDemo.addFolder('Clearcoat').close()
clearcoat.add(material, 'clearcoat')
	.min(0).max(1).step(0.01)
clearcoat.add(material, 'clearcoatRoughness')
	.min(0).max(1).step(0.01)

const sheen = debugDemo.addFolder('Sheen').close()
sheen.add(material, 'sheen')
	.min(0).max(1).step(0.01)
sheen.add(material, 'sheenRoughness')
	.min(0).max(1).step(0.01)
sheen.addColor(material, 'sheenColor')

const iridescence = debugDemo.addFolder('Iridescence').close()
iridescence.add(material, 'iridescence')
	.min(0).max(1).step(0.01)
iridescence.add(material, 'iridescenceIOR')
	.min(1).max(2.333).step(0.0001)
iridescence.add(material.iridescenceThicknessRange, '0')
	.min(0).max(100).step(1)
iridescence.add(material.iridescenceThicknessRange, '1')
	.min(0).max(100).step(1)

const transmission = debugDemo.addFolder('Transmission').close()
transmission.add(material, 'transmission')
	.min(0).max(1).step(.0001)
transmission.add(material, 'ior')
	.min(1).max(10).step(.0001)
transmission.add(material, 'thickness')
	.min(0).max(1).step(.0001)

const misc = debugDemo.addFolder('Misc').close()
misc.add(material, 'displacementScale')
	.min(0).max(1).step(.01)

misc.add(material, 'opacity')
	.min(0).max(1).step(0.01)

misc
	.add(debugObject.material, 'map', {
		red: 'red',
		green: 'green',
		color: Textures.colorTexture,
		alpha: Textures.alphaTexture,
		height: Textures.heightTexture,
		ambientOcclusion: Textures.ambientOcclusionTexture,
		metalness: Textures.metalnessTexture,
		roughness: Textures.roughnessTexture,
		normal: Textures.normalTexture,
		matcap: Textures.matcapTexture,
		gradient: Textures.gradientTexture
	})
	.onFinishChange((texture: Texture) => {
		material.map?.dispose()
		material.alphaMap?.dispose()
		material.dispose()
		if (typeof texture !== 'string') {
			material.color = DEFAULT_COLOR
			material.map = texture
			if ('gradientMap' in material) {
				texture.minFilter = NearestFilter
				texture.magFilter = NearestFilter
				material.gradientMap = texture
			}
		}
		else {
			material.map = null
			material.displacementMap = null
			material.aoMap = null
			material.alphaMap = null
			material.color = new Color(texture)
		}
	})

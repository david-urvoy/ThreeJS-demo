import { Color, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three'
import waterFragmentShader from '../static/shaders/water/fragment.glsl'
import waterVertexShader from '../static/shaders/water/vertex.glsl'
import chronometer from './core/chronometer'
import { controls } from './core/controls'
import { debugGUI } from './core/debug-gui'
import eventEmitter from './core/event/event-emitter'
import { AnimatedRenderer } from './core/renderer'
import { scene } from './core/scene'

/**
 * Water
 */
// Geometry
const waterGeometry = new PlaneGeometry(2, 2, 512, 512)

const debugSea = {
	depthColor: '#186691',
	surfaceColor: '#9bd8ff'
}

// Material
const waterMaterial = new ShaderMaterial({
	vertexShader: waterVertexShader,
	fragmentShader: waterFragmentShader,
	uniforms: {
		uTime: { value: 0 },

		uWavesHeight: { value: .2 },
		uWavesFrequency: { value: new Vector2(4, 1.5) },
		uWavesSpeed: { value: .75 },

		uSmallWavesHeight: { value: .15 },
		uSmallWavesFrequency: { value: 3 },
		uSmallWavesSpeed: { value: .2 },
		uSmallWavesIterations: { value: 4 },

		uDepthColor: { value: new Color(debugSea.depthColor) },
		uSurfaceColor: { value: new Color(debugSea.surfaceColor) },
		uColorOffset: { value: 0 },
		uColorMultiplier: { value: 1 }
	}
})

debugGUI.add(waterMaterial.uniforms.uWavesHeight, 'value').min(0).max(1).step(.001).name('Waves height')
debugGUI.add(waterMaterial.uniforms.uWavesFrequency.value, 'x').min(0).max(10).step(.001).name('Waves frequencyX')
debugGUI.add(waterMaterial.uniforms.uWavesFrequency.value, 'y').min(0).max(10).step(.001).name('Waves frequencyY')
debugGUI.add(waterMaterial.uniforms.uWavesSpeed, 'value').min(0).max(4).step(.001).name('Waves speed')

debugGUI.addColor(debugSea, 'depthColor').name('Depth color')
	.onChange((color: Color) => waterMaterial.uniforms.uDepthColor.value.set(color))
debugGUI.addColor(debugSea, 'surfaceColor').name('Surface color')
	.onChange((color: Color) => waterMaterial.uniforms.uSurfaceColor.value.set(color))
debugGUI.add(waterMaterial.uniforms.uColorOffset, 'value').min(-1).max(1).step(.001).name('Color offset')
debugGUI.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(.001).name('Color multiplier')

debugGUI.add(waterMaterial.uniforms.uSmallWavesHeight, 'value').min(0).max(1).step(.001).name('Small waves height')
debugGUI.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(.001).name('Small waves frequency')
debugGUI.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(.001).name('Small waves speed')
debugGUI.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(8).step(1).name('Small waves iterations')

// Mesh
const water = new Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)


const renderer = new AnimatedRenderer()
renderer.setClearColor(new Color('#061c2b'))
controls

eventEmitter.subscribe('tick', (clock) => waterMaterial.uniforms.uTime.value = clock.getElapsedTime())

chronometer.tick()

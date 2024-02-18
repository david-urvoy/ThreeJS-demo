import { AdditiveBlending, AxesHelper, BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial } from 'three'
import { camera } from './core/camera'
import chronometer from './core/chronometer'
import { controls } from './core/controls'
import { debugGUI } from './core/debug/debug-gui'
import { AnimatedRenderer } from './core/renderer'
import { scene } from './core/scene'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'
import eventEmitter from './core/event/event-emitter'

scene.add(new AxesHelper(.2))

const debugGalaxy = {
	starsCount: 200000,
	starsSize: 1,
	galaxySize: 5,
	galaxyBranches: 3,
	spin: true,
	randomness: .2,
	randomnessDistribution: 1.01,
	insideColor: '#1b3984',
	outsideColor: '#ff6030',
}

let stars: Points<BufferGeometry, ShaderMaterial> | null = null

const bigBang = ({
	galaxySize = debugGalaxy.galaxySize,
	starsSize = debugGalaxy.starsSize,
	starsCount = debugGalaxy.starsCount,
	galaxyBranches = debugGalaxy.galaxyBranches,
	randomness = debugGalaxy.randomness,
	randomnessDistribution = debugGalaxy.randomnessDistribution,
	insideColor: insideColorHex = debugGalaxy.insideColor,
	outsideColor: outsideColorHex = debugGalaxy.outsideColor,
}: Partial<typeof debugGalaxy>) => {
	if (stars) {
		stars.material.dispose()
		stars.geometry.dispose()
		scene.remove(stars)
	}

	stars = new Points(new BufferGeometry(), new ShaderMaterial({
		depthWrite: false, blending: AdditiveBlending, vertexColors: true,
		vertexShader, fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uSize: { value: 30 * renderer.getPixelRatio() * starsSize }
		}
	}))

	const insideColor = new Color(insideColorHex)
	const outsideColor = new Color(outsideColorHex)

	const starsData = [...Array(starsCount)]
		.map((_, index) => {
			const branchIndex = index % galaxyBranches
			const galaxyRadius = Math.random() * galaxySize
			const branchAngle = (branchIndex * Math.PI * 2 / galaxyBranches)

			const distributionRadius = Math.pow(Math.random(), randomnessDistribution) * (Math.random() < .5 ? 1 : -1) * randomness * galaxyRadius * 1.2
			const distributionAngleTheta = 2 * Math.PI * Math.random()
			const distributionAngleGamma = 2 * Math.PI * Math.random()

			const mixedColor = insideColor.clone().lerp(outsideColor, galaxyRadius / galaxySize)

			return {
				position: [
					galaxyRadius * Math.cos(branchAngle),
					0,
					galaxyRadius * Math.sin(branchAngle),
				],
				color: [mixedColor.r, mixedColor.g, mixedColor.b],
				scale: Math.random(),
				randomness: [
					distributionRadius * Math.sin(distributionAngleTheta) * Math.cos(distributionAngleGamma),
					distributionRadius * Math.sin(distributionAngleGamma) * Math.sin(distributionAngleTheta),
					distributionRadius * Math.cos(distributionAngleTheta)
				]
			}
		})

	stars.geometry.setAttribute('position', new BufferAttribute(new Float32Array(starsData.flatMap(({ position }) => position)), 3))
	stars.geometry.setAttribute('aRandomness', new BufferAttribute(new Float32Array(starsData.flatMap(({ randomness }) => randomness)), 3))
	stars.geometry.setAttribute('color', new BufferAttribute(new Float32Array(starsData.flatMap(({ color }) => color)), 3))
	stars.geometry.setAttribute('aScale', new BufferAttribute(new Float32Array(starsData.flatMap(({ scale }) => scale)), 1))

	scene.add(stars)
}


controls.update()
const renderer = new AnimatedRenderer()
eventEmitter.subscribe('tick', clock => {
	const delta = clock.getDelta()
	if (stars?.material && debugGalaxy.spin) stars.material.uniforms.uTime.value += delta
})
chronometer.tick()

bigBang(debugGalaxy)

debugGUI.add(debugGalaxy, 'starsCount').min(10).max(500000).step(10)
	.onFinishChange(bigBang)
debugGUI.add(camera.position, 'z').min(0).max(10).step(1).name('zoom')
debugGUI.add(debugGalaxy, 'starsSize').min(.1).max(10).step(.1)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'galaxySize').min(1).max(10).step(1)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'galaxyBranches').min(1).max(10).step(1)
	.onFinishChange(bigBang)
<<<<<<< HEAD
=======
// debugGUI.add(debugGalaxy, 'spin').min(-5).max(5).step(.001)
// 	.onFinishChange(bigBang)
>>>>>>> 8b3ee05 (animated galaxy)
debugGUI.add(debugGalaxy, 'randomness').min(0).max(2).step(.001)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'randomnessDistribution').min(1).max(10).step(.001)
	.onFinishChange(bigBang)
debugGUI.addColor(debugGalaxy, 'insideColor').onFinishChange(bigBang)
debugGUI.addColor(debugGalaxy, 'outsideColor').onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'spin')

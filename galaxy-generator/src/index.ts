import { AdditiveBlending, AxesHelper, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three'
import { camera } from './core/camera'
import chronometer from './core/chronometer'
import { controls } from './core/controls'
import { debugGUI } from './core/debug-gui'
import { AnimatedRenderer } from './core/renderer'
import { scene } from './core/scene'

scene.add(new AxesHelper(.2))

const debugGalaxy = {
	starsCount: 100000,
	starsSize: .01,
	galaxySize: 5,
	galaxyBranches: 3,
	spin: 1,
	randomness: .2,
	randomnessDistribution: 3,
	insideColor: '#99b6ff',
	outsideColor: '#eaa81a'
}

let stars: Points<BufferGeometry, PointsMaterial> | null = null

const bigBang = ({
	galaxySize = debugGalaxy.galaxySize,
	starsSize = debugGalaxy.starsSize,
	starsCount = debugGalaxy.starsCount,
	galaxyBranches = debugGalaxy.galaxyBranches,
	spin = debugGalaxy.spin,
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

	stars = new Points(new BufferGeometry(), new PointsMaterial({ size: starsSize, sizeAttenuation: true, depthWrite: true, blending: AdditiveBlending, vertexColors: true }))

	const insideColor = new Color(insideColorHex)
	const outsideColor = new Color(outsideColorHex)

	const starsData = [...Array(starsCount)]
		.map((_, index) => {
			const branchIndex = index % galaxyBranches
			const distanceFromCenter = Math.random() * galaxySize
			const spinAngle = distanceFromCenter * spin
			const branchAngle = (branchIndex * Math.PI * 2 / galaxyBranches) + spinAngle

			const distributionRadius = Math.pow(Math.random() * randomness, randomnessDistribution) * (Math.random() < .5 ? 1 : -1)
			const distributionAngleTheta = 2 * Math.PI * Math.random()
			const distributionAngleGamma = 2 * Math.PI * Math.random()

			const mixedColor = insideColor.clone().lerp(outsideColor, distanceFromCenter / galaxySize)

			return [
				[
					distanceFromCenter * Math.cos(branchAngle) + distributionRadius * Math.cos(distributionAngleTheta) * Math.cos(distributionAngleGamma) * 30 * distanceFromCenter,
					distributionRadius * Math.cos(distributionAngleGamma) * Math.sin(distributionAngleTheta) * 30 * distanceFromCenter,
					distanceFromCenter * Math.sin(branchAngle) + distributionRadius * Math.sin(distributionAngleGamma) * 30 * distanceFromCenter
				], [
					mixedColor.r,
					mixedColor.g,
					mixedColor.b,
				]
			]
		})
	stars.geometry.setAttribute('position', new BufferAttribute(new Float32Array(starsData.flatMap(arr => arr[0])), 3))
	stars.geometry.setAttribute('color', new BufferAttribute(new Float32Array(starsData.flatMap(arr => arr[1])), 3))

	scene.add(stars)
}

bigBang(debugGalaxy)

debugGUI.add(debugGalaxy, 'starsCount').min(10).max(100000).step(10)
	.onFinishChange(bigBang)
debugGUI.add(camera.position, 'z').min(0).max(10).step(1).name('zoom')
debugGUI.add(debugGalaxy, 'starsSize').min(.001).max(.1).step(.001)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'galaxySize').min(1).max(10).step(1)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'galaxyBranches').min(1).max(10).step(1)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'randomness').min(0).max(2).step(.001)
	.onFinishChange(bigBang)
debugGUI.add(debugGalaxy, 'randomnessDistribution').min(1).max(5).step(.001)
	.onFinishChange(bigBang)
debugGUI.addColor(debugGalaxy, 'insideColor').onFinishChange(bigBang)
debugGUI.addColor(debugGalaxy, 'outsideColor').onFinishChange(bigBang)

controls.update()
new AnimatedRenderer()
chronometer.tick()

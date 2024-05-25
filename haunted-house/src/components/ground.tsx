import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { RepeatWrapping, SRGBColorSpace, Vector2 } from 'three'

export default function Ground() {
	const alphaTexture = useTexture('./floor/alpha.webp')
	const colorTexture = useTexture('./floor/coast_sand_rocks_02_diff_1k.webp')
	const normalTexture = useTexture('./floor/coast_sand_rocks_02_nor_gl_1k.webp')
	const armTexture = useTexture('./floor/coast_sand_rocks_02_arm_1k.webp')
	const displacementTexture = useTexture('./floor/coast_sand_rocks_02_disp_1k.webp')
	colorTexture.colorSpace = SRGBColorSpace
	colorTexture.repeat.set(8, 8)
	colorTexture.wrapS = RepeatWrapping
	colorTexture.wrapT = RepeatWrapping
	displacementTexture.repeat.set(8, 8)
	displacementTexture.wrapS = RepeatWrapping
	displacementTexture.wrapT = RepeatWrapping
	normalTexture.repeat.set(8, 8)
	normalTexture.wrapS = RepeatWrapping
	normalTexture.wrapT = RepeatWrapping
	armTexture.repeat.set(8, 8)
	armTexture.wrapS = RepeatWrapping
	armTexture.wrapT = RepeatWrapping

	const { displacementScale } = useControls({
		displacementScale: { value: .3, min: 0, max: 1, step: .1 },
	})

	return <mesh rotation-x={-Math.PI * .5} receiveShadow>
		<planeGeometry args={[20, 20, 100, 100]} />
		<meshStandardMaterial
			transparent
			map={colorTexture}
			aoMap={armTexture}
			alphaMap={alphaTexture}
			displacementMap={displacementTexture}
			displacementScale={displacementScale}
			displacementBias={- .2}
			normalMap={normalTexture}
			normalScale={new Vector2(.2, .5)}
			roughnessMap={armTexture}
			metalnessMap={armTexture}
		/>
	</mesh>
}

import { Instance, Instances, useHelper, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { PointLightHelper, RepeatWrapping, Vector2 } from 'three'

const DIMENSIONS: [number, number, number] = [4, 2.5, 4]

export default function House() {
	return <group name="house" position-y={DIMENSIONS[1] * .5}>
		<Walls />
		<Roof />
		<Door />
		<Bushes />
	</group>
}

function Walls() {
	const colorTexture = useTexture('./wall/castle_brick_broken_06_diff_1k.webp')
	const armTexture = useTexture('./wall/castle_brick_broken_06_arm_1k.webp')
	const normalTexture = useTexture('./wall/castle_brick_broken_06_nor_gl_1k.webp')

	return <mesh name='walls' castShadow receiveShadow>
		<boxGeometry args={DIMENSIONS} />
		<meshStandardMaterial
			map={colorTexture}
			aoMap={armTexture}
			roughnessMap={armTexture}
			metalnessMap={armTexture}
			normalMap={normalTexture}
			normalScale={new Vector2(.3, .3)}
		/>
	</mesh>
}

function Roof() {
	const colorTexture = useTexture('./roof/roof_slates_02_diff_1k.webp')
	const armTexture = useTexture('./roof/roof_slates_02_arm_1k.webp')
	const normalTexture = useTexture('./roof/roof_slates_02_nor_gl_1k.webp')

	colorTexture.repeat.set(3, 1)
	colorTexture.wrapS = RepeatWrapping
	armTexture.repeat.set(3, 1)
	armTexture.wrapS = RepeatWrapping
	normalTexture.repeat.set(3, 1)
	normalTexture.wrapS = RepeatWrapping

	return <mesh name='roof' position-y={DIMENSIONS[1] + .75} rotation-y={Math.PI * .25} castShadow>
		<coneGeometry args={[3.5, 4, 7]} />
		<meshStandardMaterial
			map={colorTexture}
			aoMap={armTexture}
			roughnessMap={armTexture}
			metalnessMap={armTexture}
		/>
	</mesh>
}

function Door() {
	const alphaTexture = useTexture('./door/alpha.webp')
	const aoTexture = useTexture('./door/ambientOcclusion.webp')
	const colorTexture = useTexture('./door/color.webp')
	const heightTexture = useTexture('./door/height.webp')
	const metalnessTexture = useTexture('./door/metalness.webp')
	const normalTexture = useTexture('./door/normal.webp')
	const roughnessTexture = useTexture('./door/roughness.webp')

	return <group name='door' position-z={DIMENSIONS[2] * .5 + .01} position-y={-.15}>
		<mesh name='door'>
			<planeGeometry args={[2.2, 2.2, 100, 100]} />
			<meshStandardMaterial
				transparent
				alphaMap={alphaTexture}
				aoMap={aoTexture}
				displacementMap={heightTexture}
				displacementScale={.15}
				displacementBias={-.04}
				map={colorTexture}
				metalnessMap={metalnessTexture}
				normalMap={normalTexture}
				normalScale={new Vector2(.3, .3)}
				roughnessMap={roughnessTexture}
			/>
		</mesh>
		<pointLight args={['#ff7d46', 5]} position={[0, .8, .5]} />
	</group>
}

function Bushes() {
	const colorTexture = useTexture('./bush/leaves_forest_ground_diff_1k.webp')
	const armTexture = useTexture('./bush/leaves_forest_ground_arm_1k.webp')
	const normalTexture = useTexture('./bush/leaves_forest_ground_nor_gl_1k.webp')

	return <Instances>
		<sphereGeometry args={[.25]} />
		<meshStandardMaterial
			color="#ccffcc"
			map={colorTexture}
			aoMap={armTexture}
			roughnessMap={armTexture}
			metalnessMap={armTexture}
			normalMap={normalTexture}
		/>
		<Instance rotation-x={-.8} scale={.9} position={[1.5, -1.1, DIMENSIONS[2] * .5 + .7]} />
		<Instance rotation-x={-.8} scale={1.6} position={[1, -1, DIMENSIONS[2] * .5 + .5]} />
		<Instance rotation-x={-.8} position={[-1.5, -1.1, DIMENSIONS[2] * .5 + .5]} />
		<Instance rotation-x={-.8} scale={1.6} position={[-1, -1, DIMENSIONS[2] * .5 + .5]} />
	</Instances>
}

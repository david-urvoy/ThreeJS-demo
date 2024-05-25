import { Instance, Instances, useTexture } from '@react-three/drei'

const gravesCount = 30
const graveHeight = 1.1

export default function Graves() {
	const colorTexture = useTexture('./grave/plastered_stone_wall_diff_1k.webp')
	const armTexture = useTexture('./grave/plastered_stone_wall_arm_1k.webp')
	const normalTexture = useTexture('./grave/plastered_stone_wall_nor_gl_1k.webp')

	return <group name="graves">
		<Instances castShadow>
			<boxGeometry args={[.8, graveHeight, .4]} />
			<meshStandardMaterial
				map={colorTexture}
				aoMap={armTexture}
				roughnessMap={armTexture}
				metalnessMap={armTexture}
				normalMap={normalTexture}
			/>
			{
				[...Array(gravesCount)].map((_, i) =>
					<Instance key={i} position={randomGravePosition()} rotation-z={(Math.random() - .5) * .3} rotation-x={(Math.random() - .5) * .3} rotation-y={Math.random() * Math.PI} />
				)
			}
		</Instances>
	</group>
}

function randomGravePosition(scale = 1): [number, number, number] {
	const radius = Math.random() * 4 + 4
	const angle = Math.random() * 2 * Math.PI
	return [radius * Math.cos(angle), (graveHeight * .5) * scale - .1, radius * Math.sin(angle)]
}

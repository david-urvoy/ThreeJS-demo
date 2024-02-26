import { useGLTF, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export default function Portal(props: GroupProps) {

	const { nodes } = useGLTF('/portal.glb')
	const texture = useTexture('/final-portal.jpg')
	texture.flipY = false

	return <group {...props} dispose={null}>
		<mesh
			geometry={nodes.Portal.geometry}
			material={nodes.Portal.material}
			position={[-0.001, 0.969, -1.775]}
			rotation={[-1.566, 1.414, 3.137]}
		/>
		<mesh
			geometry={nodes["pole-light001"].geometry}
			material={nodes["pole-light001"].material}
			position={[-1.045, 0.516, 0.219]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<mesh
			geometry={nodes["pole-light002"].geometry}
			material={nodes["pole-light002"].material}
			position={[1.117, 0.516, 0.193]}
		/>
		<mesh
			geometry={nodes.Wood.geometry}
			material={new MeshStandardMaterial({ map: texture })}
			position={[1.2, 0.001, 1.449]}
		/>
		<mesh
			geometry={nodes.Rock.geometry}
			material={new MeshStandardMaterial({ map: texture })}
			position={[1.385, 0.001, -1.321]}
			rotation={[-Math.PI, 1.198, -Math.PI]}
		/>
		<mesh
			geometry={nodes.Metal.geometry}
			material={new MeshStandardMaterial({ map: texture })}
			position={[1.135, 0.177, 0.802]}
			rotation={[2.275, -1.134, 2.259]}
		/>
		<mesh
			geometry={nodes.Grass.geometry}
			material={new MeshStandardMaterial({ map: texture })}
		/>
	</group>
}

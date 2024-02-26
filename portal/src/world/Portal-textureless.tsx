import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export default function PortalTextureless(props: GroupProps) {

	const { nodes } = useGLTF('/portal.glb')

	return <group  {...props} dispose={null}>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes.Portal.geometry}
			material={nodes.Portal.material}
			position={[-0.001, 0.969, -1.775]}
			rotation={[-1.566, 1.414, 3.137]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes["pole-light001"].geometry}
			material={nodes["pole-light001"].material}
			position={[-1.045, 0.516, 0.219]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes["pole-light002"].geometry}
			material={nodes["pole-light002"].material}
			position={[1.117, 0.516, 0.193]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes.Wood.geometry}
			material={new MeshStandardMaterial({ color: 'orange' })}
			position={[1.2, 0.001, 1.449]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes.Rock.geometry}
			material={new MeshStandardMaterial({ color: 'lightgray' })}
			position={[1.385, 0.001, -1.321]}
			rotation={[-Math.PI, 1.198, -Math.PI]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes.Metal.geometry}
			material={new MeshStandardMaterial({ color: 'gray' })}
			position={[1.135, 0.177, 0.802]}
			rotation={[2.275, -1.134, 2.259]}
		/>
		<mesh
			castShadow
			receiveShadow
			geometry={nodes.Grass.geometry}
			material={new MeshStandardMaterial({ color: 'green' })}
		/>
	</group>
}

import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'
import { NestedObjectMap } from '../types/glb-types'
import Fireflies from './Fireflies'
import { ObjectLights } from './Lights'

export default function PortalTextureless(props: GroupProps) {

	const { nodes } = useGLTF('/portal.glb') as unknown as NestedObjectMap

	return <group  {...props} dispose={null}>
		<ObjectLights nodes={nodes} />
		<pointLight position={[-0.001, 0.969, -1.775]} distance={2.5} />
		<pointLight position={[-0.571, 1.148, 0.219]} distance={1.5} />
		<pointLight position={[0.642, 1.148, 0.193]} distance={1.5} />
		<Fireflies />
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

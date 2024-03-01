import { useGLTF, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'
import { NestedObjectMap } from '../types/glb-types'
import Fireflies from './Fireflies'
import { ObjectLights } from './Lights'

export default function Portal(props: GroupProps & { unwrappedPath: string }) {

	const { nodes } = useGLTF('/portal.glb') as unknown as NestedObjectMap
	const texture = useTexture(`/${props.unwrappedPath}.jpg`)
	texture.flipY = false

	return <group {...props} dispose={null}>
		<ObjectLights nodes={nodes} />
		<Fireflies />
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

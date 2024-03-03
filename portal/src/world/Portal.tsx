import { useGLTF, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
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
		<mesh geometry={nodes.Wood.geometry} position={[1.2, 0.001, 1.449]} >
			<meshStandardMaterial map={texture} />
		</mesh>
		<mesh geometry={nodes.Rock.geometry} position={[1.385, 0.001, -1.321]} rotation={[-Math.PI, 1.198, -Math.PI]}>
			<meshStandardMaterial map={texture} />
		</mesh>
		<mesh geometry={nodes.Metal.geometry} position={[1.135, 0.177, 0.802]} rotation={[2.275, -1.134, 2.259]}>
			<meshStandardMaterial map={texture} />
		</mesh>
		<mesh geometry={nodes.Grass.geometry}>
			<meshStandardMaterial map={texture} />
		</mesh>
	</group>
}

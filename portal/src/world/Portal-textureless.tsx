import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { PropsWithChildren } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import { NestedObjectMap } from '../types/glb-types'
import Fireflies from './Fireflies'
import { MoonLight, ObjectLights, SunLight } from './Lights'

export default function PortalTextureless(props: PropsWithChildren<GroupProps>) {

	const { nodes } = useGLTF('/portal.glb') as unknown as NestedObjectMap

	const floor = new Mesh(nodes.Grass.geometry, new MeshStandardMaterial({ color: 'green' }))
	floor.castShadow = true
	floor.receiveShadow = true

	return <group  {...props} dispose={null}>
		{props.children}
		<ObjectLights nodes={nodes} />
		<pointLight position={[-0.001, 0.969, -1.775]} distance={2.5} />
		<pointLight position={[-0.571, 1.148, 0.219]} distance={1.5} />
		<pointLight position={[0.642, 1.148, 0.193]} distance={1.5} />
		<Fireflies />
		<mesh castShadow receiveShadow geometry={nodes.Wood.geometry} position={[1.2, 0.001, 1.449]} >
			<meshStandardMaterial color='orange' />
		</mesh>
		<mesh castShadow receiveShadow geometry={nodes.Rock.geometry} position={[1.385, 0.001, -1.321]} rotation={[-Math.PI, 1.198, -Math.PI]} >
			<meshStandardMaterial color='lightgray' />
		</mesh>
		<mesh castShadow receiveShadow geometry={nodes.Metal.geometry} position={[1.135, 0.177, 0.802]} rotation={[2.275, -1.134, 2.259]} >
			<meshStandardMaterial color='gray' />
		</mesh>
		<primitive object={floor} />
		<SunLight target={floor} />
		<MoonLight />
	</group>
}

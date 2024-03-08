import { Float, Text, useGLTF, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { SRGBColorSpace } from 'three'
import { NestedObjectMap } from '../types/glb-types'
import Fireflies from './Fireflies'
import { PortalShader } from './PortalShader'

export default function PortalJourney(props: GroupProps) {

	const { nodes } = useGLTF('/journey/portal-physical-rtf.glb') as unknown as NestedObjectMap
	const texture = useTexture('/journey/baked-physical.jpg')
	texture.flipY = false
	texture.colorSpace = SRGBColorSpace

	const PoleLightMaterial = () => <meshBasicMaterial color='#ffffe5' />

	return <group {...props} dispose={null}>
		<Float><Text position-y={3}>Three Journey</Text></Float>
		<Fireflies />
		<mesh geometry={nodes.poleLightA.geometry} position={[0.715, 1.066, 0.234]}>
			<PoleLightMaterial />
		</mesh>
		<mesh geometry={nodes.portalLight.geometry} position={[0, 0.851, -1.774]} rotation={[Math.PI / 2, 0, 0]}>
			<PortalShader />
		</mesh>
		<mesh geometry={nodes.poleLightB.geometry} position={[-0.642, 1.066, 0.234]} rotation={[Math.PI, 0, Math.PI]}>
			<PoleLightMaterial />
		</mesh>
		<mesh geometry={nodes.baked.geometry}>
			<meshBasicMaterial map={texture} />
		</mesh>
	</group>
}

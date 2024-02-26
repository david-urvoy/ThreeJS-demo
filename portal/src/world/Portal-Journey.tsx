import { Float, Text, useGLTF, useTexture } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshBasicMaterial, MeshStandardMaterial, SRGBColorSpace } from 'three'

export default function PortalJourney(props: GroupProps) {

	const { nodes } = useGLTF('/journey/portal-physical-rtf.glb')
	const texture = useTexture('/journey/baked-physical.jpg')
	texture.flipY = false
	texture.colorSpace = SRGBColorSpace

	const poleLightMaterial = new MeshBasicMaterial({ color: 0xffffe5 })
	const portalLightMaterial = new MeshBasicMaterial({ color: 0xffffff })

	return <group {...props} dispose={null}>
		<Float><Text position-y={3}>Three Journey</Text></Float>
		<mesh
			geometry={nodes.poleLightA.geometry}
			material={poleLightMaterial}
			position={[0.715, 1.066, 0.234]}
		/>
		<mesh
			geometry={nodes.portalLight.geometry}
			material={portalLightMaterial}
			position={[0, 0.851, -1.774]}
			rotation={[Math.PI / 2, 0, 0]}
		/>
		<mesh
			geometry={nodes.poleLightB.geometry}
			material={poleLightMaterial}
			position={[-0.642, 1.066, 0.234]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<mesh
			geometry={nodes.baked.geometry}
			material={new MeshStandardMaterial({ map: texture })}
		/>
	</group>
}

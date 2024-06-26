import { useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper, Object3D } from 'three'
import { NestedObjectMap } from '../types/glb-types'
import { PortalShader } from './PortalShader'

export const MoonLight = () => <directionalLight scale={10} color='#FFF8DE' intensity={.2} castShadow shadow-normalBias={.04} />

export const SunLight = ({ target }: { target: Object3D }) => {

	const debug = useControls('Three Portal', {
		SunPosition: { min: -10, max: 10, value: 0 }
	})

	const directionalLight = useRef<DirectionalLight>(null!)
	useHelper(directionalLight, DirectionalLightHelper, 3, 0xff0000)

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime()
		directionalLight.current.position.x = -3 * Math.PI * Math.sin(elapsedTime)
		directionalLight.current.position.y = 3 * Math.PI * Math.cos(elapsedTime)
		directionalLight.current.position.z = debug.SunPosition
		directionalLight.current.visible = directionalLight.current.position.y > 0
		directionalLight.current.intensity = directionalLight.current.position.y / 30
	})

	return <directionalLight
		ref={directionalLight}
		castShadow
		intensity={2}
		target={target}
		shadow-normalBias={.04}
	/>
}

const PoleLightMaterial = <meshBasicMaterial color='#e6c7bb' />
export const ObjectLights = ({ nodes }: NestedObjectMap) => {
	return <>
		<mesh geometry={nodes.Portal.geometry} position={nodes.Portal.position} rotation={[-1.566, 1.414, 3.137]}>
			<PortalShader />
		</mesh>
		<mesh geometry={nodes["pole-light001"].geometry} position={nodes["pole-light001"].position} rotation={[Math.PI, 0, Math.PI]}>
			{PoleLightMaterial}
		</mesh>
		<mesh geometry={nodes["pole-light002"].geometry} position={nodes["pole-light002"].position}>
			{PoleLightMaterial}
		</mesh>
	</>
}

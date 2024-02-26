import { useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

export const MoonLight = () => <directionalLight scale={10} color='#FFF8DE' intensity={.2} castShadow shadow-normalBias={.04} />

export const SunLight = () => {

	const directionalLight = useRef<DirectionalLight>(null!)
	useHelper(directionalLight, DirectionalLightHelper, 3, 0xff0000)

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime()
		directionalLight.current.position.x = -3 * Math.PI * Math.sin(elapsedTime)
		directionalLight.current.position.y = 3 * Math.PI * Math.cos(elapsedTime)
		directionalLight.current.visible = directionalLight.current.position.y > 0
		directionalLight.current.intensity = directionalLight.current.position.y / 30
	})

	return <directionalLight
		ref={directionalLight}
		castShadow
		intensity={2}
		position-x={-Math.PI / 4}
		shadow-normalBias={.04}
	/>
}

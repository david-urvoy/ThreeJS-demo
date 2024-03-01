import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Color, ShaderMaterial } from 'three'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import portalVertexShader from '../shaders/portal/vertex.glsl'

export function PortalShader() {

	const { ColorStart, ColorEnd } = useControls('Three Portal', {
		ColorStart: {
			value: '#000000',
			onChange: color => shaderRef.current.uniforms.uColorStart.value = new Color(color)
		},
		ColorEnd: {
			value: '#ffffff',
			onChange: color => shaderRef.current.uniforms.uColorEnd.value = new Color(color)
		},
	}) as unknown as { ColorStart: string, ColorEnd: string }

	const shaderRef = useRef<ShaderMaterial>(null!)
	useFrame(({ clock }) => shaderRef.current.uniforms.uTime.value = clock.getElapsedTime())

	return <shaderMaterial
		ref={shaderRef}
		vertexShader={portalVertexShader}
		fragmentShader={portalFragmentShader}
		uniforms={{
			uTime: { value: 0 },
			uColorStart: { value: new Color(ColorStart) },
			uColorEnd: { value: new Color(ColorEnd) },
		}}
	/>
}

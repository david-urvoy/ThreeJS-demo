import { shaderMaterial } from '@react-three/drei'
import { Object3DNode, extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Color, ShaderMaterial } from 'three'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import portalVertexShader from '../shaders/portal/vertex.glsl'

interface PortalMaterial extends ShaderMaterial {
	uTime: number,
	uColorStart: Color,
	uColorEnd: Color
}
declare module '@react-three/fiber' {
	interface ThreeElements {
		portalMaterial: Object3DNode<PortalMaterial, PortalMaterial>
	}
}

export function PortalShader() {

	const shaderRef = useRef<PortalMaterial>(null!)

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

	extend({
		PortalMaterial: shaderMaterial({
			uTime: 0,
			uColorStart: new Color(ColorStart),
			uColorEnd: new Color(ColorEnd),
		},
			portalVertexShader, portalFragmentShader
		)
	})

	useFrame((_, delta) => shaderRef.current.uTime += delta)

	return <portalMaterial ref={shaderRef} />
}

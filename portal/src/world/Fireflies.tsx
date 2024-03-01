import { useControls } from 'leva'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial } from 'three'
import firefliesFragmentShader from '../shaders/fireflies/fragment.glsl'
import firefliesVertexShader from '../shaders/fireflies/vertex.glsl'
import { useFrame } from '@react-three/fiber'

export default function Fireflies() {

	const { firefliesSize } = useControls('Three Portal', {
		firefliesSize: { min: 1, max: 500, value: 100 }
	})

	const geometry = new BufferGeometry()
	const firefliesData = [...Array(30)].map(() => ({
		position: [4 * (Math.random() - .5), 1.5 * Math.random(), 4 * (Math.random() - .5)],
		scale: Math.random()
	}))
	geometry.setAttribute('position', new BufferAttribute(new Float32Array(firefliesData.flatMap(({ position }) => position)), 3))
	geometry.setAttribute('aScale', new BufferAttribute(new Float32Array(firefliesData.flatMap(({ scale }) => scale)), 1))

	const firefliesMaterial = new ShaderMaterial({
		vertexShader: firefliesVertexShader,
		fragmentShader: firefliesFragmentShader,
		uniforms: {
			uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
			uSize: { value: firefliesSize },
			uTime: { value: 0 }
		},
		transparent: true,
		blending: AdditiveBlending,
		depthWrite: false,
	})

	useFrame(({ clock }) => firefliesMaterial.uniforms.uTime.value = clock.getElapsedTime())

	return <points
		geometry={geometry}
		material={firefliesMaterial}
	/>
}

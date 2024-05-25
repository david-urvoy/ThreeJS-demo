import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { ColorRepresentation, PointLight } from 'three'

export default function Ghosts() {
	return <group name='ghosts'>
		<Ghost radius={4} color='#8800ff' speed={.6} />
		<Ghost radius={5} color='#ff0088' speed={-.5} />
		<Ghost radius={6} color='#ff0000' speed={.5} />
	</group>
}

function Ghost({ radius, color, speed }: { radius: number, color: ColorRepresentation, speed: number }) {
	const ghost = useRef<PointLight>(null!)
	useFrame(({ clock: { elapsedTime } }) => {
		if (ghost.current) {
			const angle = elapsedTime * speed
			const radiusRatio = (Math.sin(angle) * Math.sin(angle * 1.67) * Math.sin(angle * 1.89) * .2 + 1) * radius
			ghost.current.position.set(
				radiusRatio * Math.sin(angle),
				Math.sin(angle) * Math.sin(angle * 2.34) * Math.sin(angle * 3.45),
				radiusRatio * Math.cos(angle)
			)
		}
	})
	return <pointLight ref={ghost} color={color} intensity={5} castShadow />
}

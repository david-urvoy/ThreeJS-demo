import { OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ACESFilmicToneMapping, FogExp2 } from 'three'
import HauntedHouse from './haunted-house'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Leva collapsed theme={{ colors: { accent2: '#3d5b7c' }, }} />
		<Canvas
			shadows
			gl={{
				antialias: true,
				toneMapping: ACESFilmicToneMapping,
			}}
			camera={{
				position: [0, 5, 12]
			}}
			onCreated={({ scene }) => {
				scene.fog = new FogExp2('#04343f', .1)
			}}
		>
			<color args={['black']} attach="background" />
			<OrbitControls />
			<HauntedHouse />
			<PerformanceMonitor onDecline={() => console.log('performance decline')} />
			<Perf position="top-left" />
		</Canvas>
	</React.StrictMode>,
)

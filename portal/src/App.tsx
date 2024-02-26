import { OrbitControls } from '@react-three/drei'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useState } from 'react'
import { MoonLight, SunLight } from './world/Lights'
import Portal from './world/Portal'
import PortalJourney from './world/Portal-Journey'
import PortalTextureless from './world/Portal-textureless'

function App() {

	const [lights, setLights] = useState<'ambient' | 'directional'>('directional')
	useControls('Three Journey', { ToggleLights: button(() => setLights(value => value === 'ambient' ? 'directional' : 'ambient')) })

	return <>
		<color attach='background' args={['black']} />
		<OrbitControls makeDefault />
		<Perf position="top-left" />
		{
			lights === 'ambient' ? <ambientLight />
				: <>
					<SunLight />
					<MoonLight />
				</>
		}

		<PortalTextureless />
		<Portal position-z={-8} />
		<PortalJourney position-z={-16} />
	</>

}

export default App

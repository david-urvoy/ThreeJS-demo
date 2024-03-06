import { Center, MapControls } from '@react-three/drei'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useState } from 'react'
import Portal from './world/Portal'
import PortalJourney from './world/Portal-Journey'
import PortalTextureless from './world/Portal-textureless'

function App() {

	const [lights, setLights] = useState<'ambient' | 'directional'>('directional')
	const { Background } = useControls('Three Portal', {
		Background: '#111f13',
		ToggleLights: button(() => setLights(value => value === 'ambient' ? 'directional' : 'ambient'))
	})

	return <>
		<color attach='background' args={[Background]} />
		<MapControls makeDefault />
		<Perf position="top-left" />
		<Center>
			{lights === 'ambient' && <ambientLight />}
			<PortalTextureless />
			<Portal unwrappedPath='final-portal' position-z={-8} />
			<Portal unwrappedPath='final-portal-night' position-z={-16} />
			<PortalJourney position-z={-24} />
		</Center>
	</>

}

export default App

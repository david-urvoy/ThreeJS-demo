import { Sky } from '@react-three/drei'
import Ghosts from './components/ghosts'
import Graves from './components/graves'
import Ground from './components/ground'
import House from './components/house'
import Moonlight from './components/moonlight'

export default function HauntedHouse() {
	return <>
		<axesHelper />

		<Sky turbidity={10} rayleigh={3} mieCoefficient={.1} mieDirectionalG={.95} sunPosition={[.3, -.038, -.95]} />

		<ambientLight args={['#86cdff', .275]} />
		<Moonlight />

		<Ground />
		<House />
		<Graves />
		<Ghosts />
	</>
}

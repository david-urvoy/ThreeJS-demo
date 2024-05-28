export default function Moonlight() {
	return <directionalLight args={['#86cdff', 1]} position={[-10, 10, -8]} castShadow shadow-mapSize={[1024, 1024]}>
		<orthographicCamera attach='shadow-camera' top={5} bottom={-5} left={-5} right={5} near={10} far={30} />
	</directionalLight>
}

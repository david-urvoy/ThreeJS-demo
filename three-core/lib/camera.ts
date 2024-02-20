import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Coordinates3D } from './types/coordinates'

const CAMERA_HEIGHT = 20
const CAMERA_BACK = 5
const DEFAULT_POSITION: Coordinates3D = { x: 0, y: CAMERA_HEIGHT, z: CAMERA_BACK }

export type CameraParameters = NonNullable<ConstructorParameters<typeof PerspectiveCamera>>

export class Camera extends PerspectiveCamera {

	public controls: OrbitControls

	constructor ({ cameraParameters = [75, window.innerWidth / window.innerHeight, 0.1, 30], position: { x = 0, y = CAMERA_HEIGHT, z = CAMERA_BACK } = DEFAULT_POSITION, canvas }: { cameraParameters?: CameraParameters, position?: Partial<Coordinates3D>, canvas: HTMLCanvasElement }) {
		super(...cameraParameters)
		this.position.x = x
		this.position.y = y
		this.position.z = z
		this.controls = new OrbitControls(this, canvas)
		this.controls.enableDamping = true
	}
}

// window.addEventListener('auxclick', e => console.log(e))

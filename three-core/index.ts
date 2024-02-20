import { Clock } from 'three'
import { Camera, CameraParameters } from './lib/camera'
import { AnimatedRenderer } from './lib/renderer'
import { scene } from './lib/scene'
import { Coordinates3D } from './lib/types/coordinates'

export * from './lib/scene'
export * from './lib/camera'
export * from './lib/renderer'

export * from './lib/event/event-emitter'
export * from './lib/event/event-types'

export * from './lib/store/application/cursor-store'
export * from './lib/store/application/keyboard-store'
export * from './lib/store/application/window-store'

export * from './lib/debug/debug-gui'
export * from './lib/debug/monitor'

export * from './lib/types/application'
export * from './lib/types/commands'
export * from './lib/types/coordinates'

export function setupEnvironment({ canvas, cameraParameters, position, onTick }: {
	canvas: HTMLCanvasElement,
	cameraParameters?: CameraParameters,
	position?: Partial<Coordinates3D>,
	onTick?: (clock: Clock) => void
}) {
	const camera = new Camera({ cameraParameters, canvas, position })
	return {
		renderer: new AnimatedRenderer(camera, { canvas, onTick }),
		camera,
		scene
	}
}

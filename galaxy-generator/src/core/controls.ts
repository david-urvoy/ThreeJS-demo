import { MapControls, OrbitControls } from 'three/examples/jsm/Addons.js'
import { camera } from './camera'
import eventEmitter from './event/event-emitter'
import { canvas } from './renderer'
import { scene } from './scene'

// window.addEventListener('auxclick', e => console.log(e))

export const controls = new OrbitControls(camera, canvas)
controls.screenSpacePanning = false
controls.enableDamping = true
// controls.target.y = 0

eventEmitter.subscribe('tick', () => controls.update())

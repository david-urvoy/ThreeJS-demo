import { MapControls } from 'three/examples/jsm/Addons.js'
import { camera } from './camera'
import eventEmitter from './event/event-emitter'
import { canvas } from './renderer'

export const controls = new MapControls(camera, canvas)
controls.screenSpacePanning = false
controls.enableDamping = true
controls.target.y = 0

eventEmitter.subscribe('tick', () => controls.update())

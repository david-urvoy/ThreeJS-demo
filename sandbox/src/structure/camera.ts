import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { canvas } from './defaults'

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 12)
camera.position.set(0, 8, 15)
// const ratio = 3 * dimensions.width / dimensions.height
// const camera = new THREE.OrthographicCamera(-ratio, ratio, 3, -3, 0.1, 100)

// Control
export const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
// controls.target.y = 0
// controls.update()

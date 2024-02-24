import * as THREE from 'three'

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10)
camera.position.set(0, 2, 2)

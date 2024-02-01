import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { SCENE_DIMENSIONS, snowflakes } from './elements/demo-05-1-snowflakes'
import { scene } from './structure/scene'

scene.add(snowflakes, new Mesh(new BoxGeometry(SCENE_DIMENSIONS.x, SCENE_DIMENSIONS.y, SCENE_DIMENSIONS.z), new MeshBasicMaterial({ wireframe: true })))

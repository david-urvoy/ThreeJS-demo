import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { Textures } from './textures'

const floor = new Mesh(new PlaneGeometry(50, 50), new MeshBasicMaterial({map: Textures.grass}))

export const HAUNTED_HOUSE = new Group().add(floor)

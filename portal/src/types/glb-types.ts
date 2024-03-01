import { BufferGeometry, NormalBufferAttributes } from 'three'

export type NestedObjectMap = { nodes: { [name: string]: { geometry: BufferGeometry<NormalBufferAttributes> } } }

import { BufferGeometry, NormalBufferAttributes, Vector3 } from 'three'

export type NestedObjectMap = {
	nodes: {
		[name: string]: {
			geometry: BufferGeometry<NormalBufferAttributes>,
			position: Vector3
		}
	}
}

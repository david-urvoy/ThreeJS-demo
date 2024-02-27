import { CubeTextureLoader, LoadingManager, NearestFilter, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three'

const loadingManager = new LoadingManager()

const textureLoader = new TextureLoader(loadingManager)
const cubeTextureLoader = new CubeTextureLoader(loadingManager)

export const Textures = {
	door: {
		color: textureLoader.load('/textures/door/color.jpg'),
		alpha: textureLoader.load('/textures/door/alpha.jpg'),
		height: textureLoader.load('/textures/door/height.jpg'),
		ambientOcclusion: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
		metalness: textureLoader.load('/textures/door/metalness.jpg'),
		roughness: textureLoader.load('/textures/door/roughness.jpg'),
		normal: textureLoader.load('/textures/door/normal.jpg'),
	},
	bricks: {
		color: textureLoader.load('/textures/bricks/color.jpg'),
		ambientOcclusion: textureLoader.load('/textures/bricks/ambientOcclusion.jpg'),
		normal: textureLoader.load('/textures/bricks/normal.jpg'),
		roughness: textureLoader.load('/textures/bricks/roughness.jpg'),
	},
	grass: {
		color: textureLoader.load('/textures/grass/color.jpg'),
		ambientOcclusion: textureLoader.load('/textures/grass/ambientOcclusion.jpg'),
		normal: textureLoader.load('/textures/grass/normal.jpg'),
		roughness: textureLoader.load('/textures/grass/roughness.jpg'),
	},
	matcap: textureLoader.load('/textures/matcaps/1.png'),
	gradient: textureLoader.load('/textures/gradients/5.jpg'),
	environmentMaps: cubeTextureLoader.load([
		'textures/environmentMap/0/px.png',
		'textures/environmentMap/0/nx.png',
		'textures/environmentMap/0/py.png',
		'textures/environmentMap/0/ny.png',
		'textures/environmentMap/0/pz.png',
		'textures/environmentMap/0/nz.png',
	])
}

Textures.door.color.colorSpace = SRGBColorSpace
Textures.bricks.color.colorSpace = SRGBColorSpace
Textures.matcap.colorSpace = SRGBColorSpace
Textures.grass.color.colorSpace = SRGBColorSpace
Textures.grass.color.repeat.set(8, 8)
Textures.grass.ambientOcclusion.repeat.set(8, 8)
Textures.grass.normal.repeat.set(8, 8)
Textures.grass.roughness.repeat.set(8, 8)
Textures.grass.color.wrapS = RepeatWrapping
Textures.grass.ambientOcclusion.wrapS = RepeatWrapping
Textures.grass.normal.wrapS = RepeatWrapping
Textures.grass.roughness.wrapS = RepeatWrapping
Textures.grass.color.wrapT = RepeatWrapping
Textures.grass.ambientOcclusion.wrapT = RepeatWrapping
Textures.grass.normal.wrapT = RepeatWrapping
Textures.grass.roughness.wrapT = RepeatWrapping

// colorTexture.generateMipmaps = false // When minFilter = NearestFilter
Textures.door.color.magFilter = NearestFilter

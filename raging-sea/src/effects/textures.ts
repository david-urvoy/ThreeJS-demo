import { LoadingManager, NearestFilter, SRGBColorSpace, TextureLoader } from 'three'

const loadingManager = new LoadingManager()

const textureLoader = new TextureLoader(loadingManager)

export const Textures = {
	// colorTexture: textureLoader.load('/textures/door/color.jpg'),
	// alphaTexture: textureLoader.load('/textures/door/alpha.jpg'),
	// heightTexture: textureLoader.load('/textures/door/height.jpg'),
	// ambientOcclusionTexture: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
	// metalnessTexture: textureLoader.load('/textures/door/metalness.jpg'),
	// roughnessTexture: textureLoader.load('/textures/door/roughness.jpg'),
	// normalTexture: textureLoader.load('/textures/door/normal.jpg'),
	// matcapTexture: textureLoader.load('/textures/matcaps/1.png'),
	// gradientTexture: textureLoader.load('/textures/gradients/5.jpg'),
	// grass: textureLoader.load('/textures/grass/color.jpg')
}

// Textures.colorTexture.colorSpace = SRGBColorSpace
// Textures.matcapTexture.colorSpace = SRGBColorSpace
// Textures.grass.colorSpace = SRGBColorSpace

// // colorTexture.generateMipmaps = false // When minFilter = NearestFilter
// Textures.colorTexture.magFilter = NearestFilter

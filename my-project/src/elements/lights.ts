import { AmbientLight, Color, DirectionalLight, HemisphereLight, Light, PointLight, RectAreaLight, SpotLight } from 'three'
import { debugGUI } from '../structure/debug-gui'

const debugLightObject = {
	color: new Color(0xffffff),
	intensity: 300
}

export const ambientLight = new AmbientLight(debugLightObject.color, debugLightObject.intensity)
export const pointLight = new PointLight(debugLightObject.color, debugLightObject.intensity)
export const spotLight = new SpotLight(debugLightObject.color, debugLightObject.intensity)
export const hemisphereLight = new HemisphereLight(debugLightObject.color, debugLightObject.intensity)
export const rectLight = new RectAreaLight(debugLightObject.color, debugLightObject.intensity)
export const directionalLight = new DirectionalLight(debugLightObject.color, debugLightObject.intensity)

const lights = [ambientLight, pointLight, spotLight, hemisphereLight, rectLight, directionalLight]

export const debugLight = debugGUI.addFolder('Debug Light')
debugLight.addColor(debugLightObject, 'color')
	.onFinishChange((color: Color) => lights.forEach((light: Light) => light.color = color))
debugLight.add(debugLightObject, 'intensity')
	.min(0).max(1000).step(1)
	.onFinishChange((intensity: number) => lights.forEach((light: Light) => light.intensity = intensity))

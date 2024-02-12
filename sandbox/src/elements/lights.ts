import { AmbientLight, Color, DirectionalLight, HemisphereLight, Light, PointLight, RectAreaLight, SpotLight } from 'three'
import { debugGUI } from '../structure/debug-gui'

const debugLightObject = {
	color: new Color(0xffffff),
	intensity: .5
}

export const Lights = {
	ambientLight: new AmbientLight(debugLightObject.color, debugLightObject.intensity),
	pointLight: new PointLight(debugLightObject.color, debugLightObject.intensity),
	spotLight: new SpotLight(debugLightObject.color, debugLightObject.intensity),
	hemisphereLight: new HemisphereLight(debugLightObject.color, debugLightObject.intensity),
	rectLight: new RectAreaLight(debugLightObject.color, debugLightObject.intensity),
	directionalLight: new DirectionalLight(debugLightObject.color, debugLightObject.intensity),
}

// export const debugLight = debugGUI.addFolder('Debug Light')
// debugLight.addColor(debugLightObject, 'color')
// 	.onFinishChange((color: Color) => Object.fromEntries(Object.entries(Lights).map(([key, value]) => [key, { ...value, color }])))
// debugLight.add(debugLightObject, 'intensity')
// 	.min(0).max(1000).step(1)
// 	.onFinishChange((intensity: number) => Object.fromEntries(Object.entries(Lights).map(([key, value]) => [key, { ...value, intensity }])))

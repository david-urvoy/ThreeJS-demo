uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * .08;
	modelPosition.x += cos(uTime + modelPosition.x * 100.0) * aScale * .08;
	modelPosition.z += cos(uTime + modelPosition.z * 100.0) * aScale * .08;
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectionPosition = projectionMatrix * viewPosition;

	gl_Position = projectionPosition;
	gl_PointSize = aScale * uSize * uPixelRatio * (- 1.0 / viewPosition.z);
}

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

uniform float uColorOffset;
uniform float uColorMultiplier;

uniform float uWavesHeight;

varying float vHeight;

void main() {
	float colorRange = (vHeight + uWavesHeight) / (2.0 * uWavesHeight);
	vec3 mixedColor = mix(uDepthColor, uSurfaceColor, (colorRange + uColorOffset) * uColorMultiplier);
	gl_FragColor = vec4(mixedColor, 1.0);

	#include <colorspace_fragment>
}

void main() {
	float distanceToCenter = distance(gl_PointCoord, vec2(.5));
	float strength = .05 * (1.0 / distanceToCenter - 2.0);
	gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}

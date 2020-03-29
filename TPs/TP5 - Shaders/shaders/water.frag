#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D waterTex;

void main() {
	vec4 color = texture2D(waterTex, vTextureCoord);
	vec4 filter = texture2D(waterMap, vec2(0.0,0.1)+vTextureCoord);

	if (filter.b > 0.5)
		color=vec4(0.52, 0.18, 0.11, 1.0);
	
	gl_FragColor = color;
}
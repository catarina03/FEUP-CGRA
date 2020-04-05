#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(waterMap, vec2(0.0,0.1)+vTextureCoord);

	//if (filter.b > 0.5)
		//color=vec4(0.52, 0.18, 0.11, 1.0);
	color= color - vec4(filter.r*0.2, filter.g*0.2, filter.b*0.2, 0);
	
	gl_FragColor = color;
}
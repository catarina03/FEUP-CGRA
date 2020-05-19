#ifdef GL_ES
precision highp float;
#endif

uniform float cutoff;

varying vec3 vVertexPosition;

void main() {

	if((0.5 + vVertexPosition.x ) > cutoff)
	{
		gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
	}
	else
	{
		//g = 0.5 + x
		//r = 0,5 - x
		gl_FragColor = vec4(0.5 - vVertexPosition.x , 0.5 + vVertexPosition.x, 0.0, 1.0);
	}
}
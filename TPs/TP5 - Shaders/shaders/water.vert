attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D waterMap;

void main() {
	
	vTextureCoord = aTextureCoord + vec2(0.005 , 0.005 )* timeFactor;
	vec3 offset = vec3(0.0, 0.0, 0.0);

	offset=aVertexNormal * texture2D(waterMap, vec2(0.0,0.1)+vTextureCoord).b*0.04;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset , 1.0);

	
}


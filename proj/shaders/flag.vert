attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float phase;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset = aVertexNormal;
	offset.z *= sin(aVertexPosition.x * 30.0 + phase) * 0.1;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}

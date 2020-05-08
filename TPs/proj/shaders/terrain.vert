#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D terrainMap;

void main() {
    vTextureCoord = aTextureCoord;
	vec3 offset = vec3(0.0, 0.0, 0.0);

    offset = aVertexNormal * texture2D(terrainMap, vTextureCoord).b * 0.1;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}


precision highp float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

void main()
{
    fragTexCoord = vertTexCoord;
    gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.0);
}
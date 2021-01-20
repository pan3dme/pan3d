attribute vec3 position;
 
attribute vec2 textCoordinate;
 
uniform mat4 posMatrix;
 
varying lowp vec2 varyTextCoord;
 
void main()
{
 
    varyTextCoord = textCoordinate;
 
    vec4 vPos = vec4(position.xyz,1.0);
 
    gl_Position = vPos * posMatrix;
 
}

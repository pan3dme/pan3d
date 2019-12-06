//将纹理数据传递到片元着色器中
varying lowp vec2 varyTextCoord;
 
//2D
uniform sampler2D colorMap;
 
void main()
{
    //内建变量 gl_FragColor 必须赋值
    //参数1：texture2D的第一个参数是采样器，参数二这里是纹理坐标
    gl_FragColor = texture2D(colorMap,varyTextCoord);
     gl_FragColor = vec4(0,0,1,1);
}

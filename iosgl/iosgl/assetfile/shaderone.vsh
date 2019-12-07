attribute vec4 position;
 
//纹理
attribute vec2 textCoordinate;
 
//旋转矩阵
uniform mat4 rotateMatrix;
 
//将纹理数据传递到片元着色器中
varying lowp vec2 varyTextCoord;
 
void main()
{
    //将textCoordinate通过varyTextCoord传递到片元着色器中
    varyTextCoord = textCoordinate;
    //顶点着色器中顶点一个一个的计算，但是GPU是并行运算的，所以会很快的算完
    vec4 vPos = position;
    //将顶点应用旋转变换
    vPos = vPos * rotateMatrix;
    //赋值给内建变量
    gl_Position = vPos;
 
}



package z3d.display;

import z3d.program.Shader3D;

public class BuildDisplay3DShader extends Shader3D {
    public  static  String shaderStr="BuildDisplay3DShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "textureCoordinate=vTextCoord;\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "uniform sampler2D colorMap;\n"+
                "void main() {\n"+

                    "vec4 aa =texture2D(colorMap,textureCoordinate);\n"+
                    "vec4 bb =vec4(textureCoordinate.xy,1.0,1.0);\n"+

                    "gl_FragColor=aa;\n"+
                "}";

        return fragment;
    }
}


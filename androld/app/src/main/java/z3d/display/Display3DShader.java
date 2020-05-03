package z3d.display;

import z3d.program.Shader3D;

public class Display3DShader extends Shader3D {

    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+

                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1.0,0.0,0.0,1.0);\n"+
                "}";

        return fragment;
    }
}

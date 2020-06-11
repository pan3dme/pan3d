package z3d.display.role;

import z3d.program.Shader3D;

public class Display3dMovieShader extends Shader3D {
    public  static  String shaderStr="Display3dMovieShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+

                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1.0,0.5,0.4,1.0);\n"+
                "}";

        return fragment;
    }
}

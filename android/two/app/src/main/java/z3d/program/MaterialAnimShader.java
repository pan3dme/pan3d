package z3d.program;

import android.util.Log;

import z3d.program.Shader3D;

public class MaterialAnimShader extends Shader3D {
    public  static  String shaderNameStr="MaterialAnimShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=vTextCoord;\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "uniform sampler2D fs0;\n"+
                "varying vec2 v0;\n"+
                "void main() {\n"+

                "vec4 aa =texture2D(fs0,v0);\n"+
                "vec4 bb =vec4(1,0,1,1);\n"+
                "gl_FragColor= aa;\n"+
                "}";

        return fragment;
    }
}


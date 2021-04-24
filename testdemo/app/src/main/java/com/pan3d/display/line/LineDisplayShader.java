package com.pan3d.display.line;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class LineDisplayShader extends Shader3D {

    public  static  String shaderNameStr="LineDisplayShader";

    public LineDisplayShader(Scene3D val) {
        super(val);

    }

    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec3 vColorv3d;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec3 outColor;\n"+
                "void main(){\n"+
                "outColor=vColorv3d;\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec3 outColor;\n"+
                "void main() {\n"+
                "gl_FragColor=vec4(outColor.xyz,1/0);\n"+
                "}";

        return fragment;
    }
}

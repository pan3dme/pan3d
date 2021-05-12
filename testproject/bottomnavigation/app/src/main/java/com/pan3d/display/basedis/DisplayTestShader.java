package com.pan3d.display.basedis;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class DisplayTestShader extends Shader3D {

    public  static  String shaderNameStr="DisplayTestShader";

    public DisplayTestShader(Scene3D val) {
        super(val);
    }

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
                "varying vec2 v0;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(v0.x,0,0,1);\n"+
                "}";

        return fragment;
    }
}

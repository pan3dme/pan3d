package com.pan3d.display;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class Display3DShader extends Shader3D {

    public  static  String shaderNameStr="Display3DShader";

    public Display3DShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {
        String vertex= "attribute vec3 vPosition;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

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

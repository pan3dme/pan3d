package com.pan3d.display;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class BuildDisplay3DShader extends Shader3D {

    public  static  String shaderNameStr="BuildDisplay3DShader";

    public BuildDisplay3DShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {

        String vertex=
                "attribute vec3 v3Position;\n"+
                "attribute vec2 v2TexCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+
                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=v2TexCoord;\n"+
                 "gl_Position = vpMatrix3D*vec4(v3Position*0.1,1);\n"+
                "}";
        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment =
                "precision mediump float;\n"+
                "uniform sampler2D fs0;\n"+
                "varying vec2 v0;\n"+
                "void main()"+
                "{"+
                "vec4 infoUv  =texture2D(fs0,v0.xy);\n"+
                "gl_FragColor =infoUv;\n"+
                "}";

        return fragment;
    }
}

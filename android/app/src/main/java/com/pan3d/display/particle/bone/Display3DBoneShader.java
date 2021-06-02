package com.pan3d.display.particle.bone;

import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;

public class Display3DBoneShader extends Shader3D {
    public  static  String shaderNameStr="Display3DBoneShader";

    public Display3DBoneShader(Scene3D val) {
        super(val);
    }

    public String getVertexShaderString() {

        String vertex=
                "attribute vec3 v3Position;\n"+
                        "attribute vec2 v2TexCoord;\n"+
                        "uniform mat4 viewMatrix;\n"+
                        "uniform mat4 camMatrix;\n"+
                        "uniform mat4 modeMatrix;\n"+
                        "uniform mat4 rotMatrix;\n"+
                        "varying vec2 v0;\n"+
                        "void main()"+
                        "{"+
                        "v0=v2TexCoord;\n"+
                        "vec4 vPos = vec4(v3Position.xyz,1.0);\n"+
                        "gl_Position =   (viewMatrix*camMatrix)*(modeMatrix*rotMatrix*vPos);\n"+
                        "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment = "precision mediump float;\n"+
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

package com.z3d.frame3d.dis;
import com.z3d.program.Shader3D;

public class FrameBuildShader extends Shader3D {
    public  static  String FrameBuildShader="FrameBuildShader";
    public String getVertexShaderString() {

        String vertex=
                "attribute vec3 pos;" +
                        "attribute vec2 v2Uv;" +
                        "varying vec2 v0;\n" +
                        "uniform mat4 vpMatrix3D;" +
                        "uniform mat4 posMatrix3D;" +
                        " void main(void){" +
                        "    v0 = v2Uv;" +
                        "    vec4 vt0 = vec4(pos.x, pos.y, pos.z,1.0);" +
                        "    vt0 = posMatrix3D * vt0;" +
                        "    vt0 = vpMatrix3D * vt0;" +
                        "    gl_Position = vt0;\n" +
                        "  }";
        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment =
                "precision mediump float;\n" +
                        "uniform sampler2D fs0;\n"+
                        "varying vec2 v0;\n" +
                        "void main(void)\n" +
                        "{\n" +
                        "vec4 infoUv  =texture2D(fs0,v0.xy);\n"+
                        "gl_FragColor =infoUv;\n" +
                        "}";

        return fragment;
    }
}


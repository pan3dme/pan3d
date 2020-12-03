package z3d.display.particle.facet;

import z3d.program.Shader3D;

public class Display3DFacetShader extends Shader3D {
    public  static  String shaderNameStr="Display3DFacetShader";
    public String getVertexShaderString() {

        String vertex=
                "attribute vec3 v3Position;\n"+
        "attribute vec2 v2TexCoord;\n"+
                        "uniform mat4 viewMatrix;\n"+
                        "uniform mat4 camMatrix;\n"+
                        "uniform mat4 modeMatrix;\n"+
                        "uniform mat4 rotMatrix;\n"+
                        "uniform vec2 uvMove;\n"+
        "varying vec2 v0;\n"+
        "void main()"+
        "{"+
        "v0=v2TexCoord.xy+uvMove.xy;\n"+
        "vec4 vPos = vec4(v3Position.xyz,1.0);\n"+
          "gl_Position =   (viewMatrix*camMatrix)*(modeMatrix*rotMatrix*vPos);\n"+
        "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
        "uniform sampler2D fs0;\n"+
        "varying vec2 v0;\n"+
        "void main()"+
        "{"+
        "vec4 infoUv   =texture2D(fs0,v0.xy);\n"+
        "gl_FragColor =infoUv;\n"+
        "}";

        return fragment;
    }
}

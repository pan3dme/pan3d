package z3d.display.particle.locus;


import z3d.program.Shader3D;

public class Display3DLocusShader extends Shader3D {
    public static int getVcSize()
    {
        return 4;
    }
    public  static  String shaderNameStr="Display3DLocusShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 v3Position;\n"+
                "attribute vec2 v2TexCoord;\n"+
                "attribute vec4 v3Normal;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=v2TexCoord;\n"+
                "gl_Position = vpMatrix3D*posMatrix*vec4(v3Position*0.1,1);\n"+

                "}";



        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "void main() {\n"+
                      "gl_FragColor= vec4(1.0,0.0,0.0,1.0);\n"+
                "}";

        return fragment;
    }



}

package z3d.display.particle.locus;


import z3d.program.Shader3D;

public class Display3DLocusShader extends Shader3D {
    public static int getVcSize()
    {
        return 4;
    }
    public  static  String shaderNameStr="Display3DLocusShader";
    public String getVertexShaderString() {

        String vertex=   "attribute vec3 v3Position;\n"+
                "attribute vec2 v2TexCoord;\n"+
                "attribute vec4 v3Normal;\n"+
                "uniform mat4 viewMatrix;\n"+
                "uniform mat4 camMatrix;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 v0;\n"+
                "void main(){\n"+
                "v0=v2TexCoord;\n"+
                " vec4 tempPos = posMatrix * vec4(v3Position.xyz,1.0);\n"+
                "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
                "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"+
                "mulPos = normalize(vec3(0,0,0) - mulPos);\n"+
                "mulPos = cross(mulPos, normals);\n"+
                "mulPos = normalize(mulPos);\n"+
                "mulPos *= v3Normal.w;\n"+
                "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+

                "gl_Position = viewMatrix*camMatrix*posMatrix*tempPos;\n"+

                "}";



        return vertex;
    }

    public String getFragmentShaderString() {
        String fragment =
                "precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1,0,0,1);\n"+
                "}";

        return fragment;
    }
}

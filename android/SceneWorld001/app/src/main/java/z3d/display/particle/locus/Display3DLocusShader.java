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
                "uniform mat4 modeMatrix;\n"+
                "uniform vec4 vcmat30;\n"+
                "uniform vec4 v3CamPos;\n"+
                "varying vec2 v0;\n"+
                "varying vec2 v1;\n"+
                "varying vec4 v2;\n"+
                "void main(){\n"+

                "vec2 tempv0 = v2TexCoord;\n"+
                "tempv0.x -= vcmat30.x;\n"+
                "float alpha = tempv0.x/vcmat30.y;\n"+
                "alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"+
                "float kill = -tempv0.x;\n"+
                "kill *= tempv0.x - vcmat30.z;\n"+
                "v2 = vec4(kill,0.0,0.0,alpha);\n"+
                "v1 = v2TexCoord;\n"+
                "v0 = tempv0;\n"+



                "vec4 tempPos = modeMatrix * vec4(v3Position.xyz,1.0);\n"+
                "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
                "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"+
                "mulPos = normalize(vec3(v3CamPos.xyz) - mulPos);\n"+
                "mulPos = cross(mulPos, normals);\n"+
                "mulPos = normalize(mulPos);\n"+
                "mulPos *= v3Normal.w*2.0  ;\n"+
                "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+

                "gl_Position =viewMatrix*camMatrix*modeMatrix* tempPos ;\n"+


                "}";



        return vertex;
    }

    public String getFragmentShaderString() {
        String fragment =  "precision mediump float;\n"+
                "uniform sampler2D fs0;"+
                "uniform sampler2D fs1;"+
                "uniform vec4 fc[1];"+
                "varying vec2 v0;\n"+
                "varying vec2 v1;\n"+
                "varying vec4 v2;\n"+
                "void main() {\n"+

                "vec4 ft0 = texture2D(fs0,v0);"+
                "ft0.xyz *= ft0.w;"+
                "vec4 ft1 = texture2D(fs1,v1);"+
                "ft1.xyz = ft1.xyz * ft1.w;"+
                "vec4 ft2 = ft0 * ft1;"+
                "ft0 = ft2 * v2.w;"+
                "ft1.xyz = ft0.xyz;"+
                "ft1.w = ft0.w;"+
//                "if(v2.x<fc[0].x){discard;}"+

                "gl_FragColor = ft1;"+

                "}";

        return fragment;
    }
}

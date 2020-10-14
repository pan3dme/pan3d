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
                " vec4 tempPos = posMatrix * vec4(v3Position.xyz,1.0);\n"+
                "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
                "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"+
                "mulPos = normalize(vec3(0,0,0) - mulPos);\n"+
                "mulPos = cross(mulPos, normals);\n"+
                "mulPos = normalize(mulPos);\n"+
                "mulPos *= v3Normal.w;\n"+
                "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+

                "gl_Position = vpMatrix3D*posMatrix*tempPos;\n"+

                "}";



        return vertex;
    }
    /*
    void main(void){
   vec2 tempv0 = v2TexCoord;
   tempv0.x -= vcmat[3][0].x;
   float alpha = tempv0.x/vcmat[3][0].y;
   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);
   float kill = -tempv0.x;
   kill *= tempv0.x - vcmat[3][0].z;
   v2 = vec4(kill,0.0,0.0,alpha);
   v1 = v2TexCoord;
   v0 = tempv0;
   vec4 tempPos = vcmat[2] * v3Position;
   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);
   vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);
   mulPos = normalize(vec3(vcmat[3][1].xyz) - mulPos);
   mulPos = cross(mulPos, normals);
   mulPos = normalize(mulPos);
   mulPos *= v3Normal.w;
   tempPos.xyz = mulPos.xyz + v3Position.xyz;
   gl_Position = vcmat[0]  * vcmat[1] * vcmat[2] * tempPos;
}
     */
    public String getFragmentShaderString() {
        String fragment =
                "precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(v0.x,0,1,1);\n"+
                "}";

        return fragment;
    }
}

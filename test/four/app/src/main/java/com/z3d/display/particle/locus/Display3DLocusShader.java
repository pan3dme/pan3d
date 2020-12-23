package com.z3d.display.particle.locus;


import com.z3d.program.Shader3D;
import com.z3d.scene.Scene3D;

public class Display3DLocusShader extends Shader3D {
    public Display3DLocusShader(Scene3D val) {
        super(val);
    }

    public static int getVcSize()
    {
        return 4;
    }
    public  static  String shaderNameStr="Display3DLocusShader";
    public String getVertexShaderString() {

        boolean isWatchEye = this.paramAry.get(0);



        String defineBaseStr =
                "attribute vec4 v3Position;\n"+
                        "attribute vec2 v2TexCoord;\n"+
                        "attribute vec4 v3Normal;\n"+
                        "uniform mat4 viewMatrix;\n"+
                        "uniform mat4 camMatrix;\n"+
                        "uniform mat4 modeMatrix;\n"+
                        "uniform vec3 vcmat30;\n"+
                        "varying vec2 v0;\n"+
                        "varying vec4 v2;\n"+
                        "varying vec2 v1;\n";
        if(isWatchEye){//面向视角需要有镜头
            defineBaseStr+= "uniform vec4 v3CamPos;\n";
        }
        String mainBaseStr=

                "   vec2 tempv0 = v2TexCoord;\n"+
                        "   tempv0.x -= vcmat30.x;\n"+
                        "   float alpha = tempv0.x/vcmat30.y;\n"+
                        "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"+
                        "   float kill = -tempv0.x;\n"+
                        "   kill *= tempv0.x - vcmat30.z;\n"+
                        "   v2 = vec4(kill,0.0,0.0,alpha);\n"+
                        "   v1 = v2TexCoord;\n"+
                        "   v0 = tempv0;\n"+

                        "   vec4 tempPos = modeMatrix* v3Position;\n"+
                        "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"+
                        "   vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n";

        if(isWatchEye){//面向视角需要有镜头算法
            mainBaseStr+="   mulPos = normalize(vec3(v3CamPos.xyz) - mulPos);\n";
        }
        mainBaseStr+= "   mulPos = cross(mulPos, normals);\n"+
                "   mulPos = normalize(mulPos);\n"+
                "   mulPos *= v3Normal.w;\n"+
                "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"+
                "   gl_Position = viewMatrix  * camMatrix * modeMatrix* tempPos;\n" ;

        String resultStr = defineBaseStr+
                "void main(void){\n"+
                mainBaseStr+
                "}";



        return resultStr;
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

                "vec4 ft0 = texture2D(fs0,v0);\n"+
//                "ft0.xyz *= ft0.w;\n"+
                "vec4 ft1 = texture2D(fs1,v0);\n"+
//                "ft1.xyz = ft1.xyz * ft1.w;\n"+
//                "vec4 ft2 = ft0 * ft1;\n"+
//                "ft0 = ft2 * v2.w;\n"+
//                "ft1.xyz = ft0.xyz;\n"+
//                "ft1.w = ft0.w;\n"+
                "if(v2.x<fc[0].x){discard;}\n"+
                "gl_FragColor = vec4(1,1,1,1);\n"+

                "}";

        return fragment;
    }
}

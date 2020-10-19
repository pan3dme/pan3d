package z3d.display.particle.ball;

import z3d.program.Shader3D;

public class Display3DBallPartilceShader extends Shader3D {
    public static int getVcSize()
    {
        return 4;
    }
    public  static  String shaderNameStr="Display3DBallPartilceShader";
    public String getVertexShaderString() {

        String vertex=
                "attribute vec4 vPosition;\n"+
        "attribute vec3 texcoord;\n"+
        "attribute vec4 basePos;\n"+
        "attribute vec3 speed;\n"+
        "uniform mat4 viewMatrix;\n"+
        "uniform mat4 camMatrix;\n"+
        "uniform mat4 modeMatrix;\n"+
        "uniform mat4 rotMatrix;\n"+

        "uniform vec4 vcmat50;\n"+
        "uniform vec4 vcmat51;\n"+
        "uniform vec4 vcmat52;\n"+
        "uniform vec4 vcmat53;\n"+

        "varying vec2 v0;\n"+
        "varying vec2 v1;\n"+
        "varying vec3 outvec3;\n"+



        "void main()\n"+
        "{\n"+
        "vec4 pos = vec4(vPosition.xyz,1.0);\n"+
//        "float ctime = CTM();\n"+
//        "float stime = STM(ctime);\n"+
//
//        "if (ctime < 0.0 || ctime > vcmat50.z) {\n" + //时间周期内-1；
//        "pos.x =0.0;\n" +//设置不可见
//        "pos.y =0.0;\n"+//设置不可见
//        "}else{\n"+
//        "pos = S_POS(pos,stime);\n" + //缩放比例
//        "pos = rotMatrix* pos;\n"  + //面向视角
//        "vec3 addPos =ADD_POS(speed,ctime);\n" +//加速度
//        "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n"+
//        "}\n"+
//        "gl_Position =IW(pos);\n"+
//        "v0=vec2(texcoord.xy);\n"+
//        "v1=vec2(ctime/vcmat50.z,0.0);\n"+

            "gl_Position =viewMatrix*camMatrix*modeMatrix* pos ;\n"+

        "}";



        return vertex;
    }

    public String getFragmentShaderString() {

        String fragment ="precision mediump float;\n"+
        "uniform sampler2D fs0;\n"+
        "uniform sampler2D fs1;\n"+
        "uniform vec4 fc[1];\n"+
        "varying vec2 v0;\n"+
        "varying vec2 v1;\n"+
        "varying vec3 outvec3;\n"+

        "void main()"+
        "{"+
//        "vec4 infoUvf0  =texture2D(fs0,v0.xy);\n"+
//        "vec4 infoUvf1  =texture2D(fs1,v1.xy);\n"+
        "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n"+
        "}";

        return fragment;
    }
}

package z3d.program;

import android.content.Context;
import android.opengl.GLES30;
import android.opengl.GLES30;

import java.util.HashMap;
import java.util.List;

import javax.microedition.khronos.opengles.GL10;

import z3d.base.Scene_data;

public class Shader3D {
    //    public String vertex;
//    public String fragment;
//    public String name;
    public int program;
    public int vShader;
    public int fShader;
//    public List paramAry;
//    public HashMap localDic;


    public boolean encode() {
        Context context= Scene_data.context;
        String vertexShaderCode = "attribute vec3 vPosition;\n"+
                "attribute vec2 texcoord;\n"+
                "uniform mat4 viewMatrix;\n"+
                "uniform mat4 posMatrix;\n"+
                "varying vec2 v0;\n"+
                "void main()"+
                "{"+
                "v0= texcoord;\n"+
                "vec4 vPos = vec4(vPosition.xyz,1.0);\n"+
                "gl_Position = vPos * posMatrix* viewMatrix;\n"+
                "}";

        String fragmentShaderCode ="precision mediump float;\n"+
                "varying vec2 v0;\n"+
                "void main()"+
                "{"+
                "gl_FragColor =vec4(1.0,1.0,1.0,1.0);\n"+
                "}";




        this.vShader= GLES30.glCreateShader(GLES30.GL_VERTEX_SHADER);
        this.fShader=   GLES30.glCreateShader(GLES30.GL_FRAGMENT_SHADER);

        GLES30.glShaderSource(this.vShader, vertexShaderCode);
        GLES30.glShaderSource(this.fShader, fragmentShaderCode);

        GLES30.glCompileShader(this.vShader);
        GLES30.glCompileShader(this.fShader);


        int e = GLES30.glCreateProgram();
        this.program = GLES30.glCreateProgram();
        GLES30.glAttachShader(this.program, this.vShader);
        GLES30.glAttachShader(this.program, this.fShader);
        GLES30.glLinkProgram(this.program);

        // var info: string = context.getProgramInfoLog(this.program);

        String proLog=  GLES30.glGetProgramInfoLog(this.program);
        String vLog=  GLES30.glGetShaderInfoLog(this.vShader);
        String fLog=  GLES30.glGetShaderInfoLog(this.fShader);


        return true;

    }

    private String getVertexShaderString() {
        return "";
    }
    private String getFragmentShaderString() {
        return "";
    }
    public void destory() {

    }
}

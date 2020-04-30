package z3d.program;

import android.content.Context;
import android.opengl.GLES20;


import java.util.HashMap;
import java.util.List;

import javax.microedition.khronos.opengles.GL10;

import Pan3d.filter.AFilter;
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
        /*
        Context context= Scene_data.context;
        String vertexShaderCode = "attribute vec3 vPosition;\n"+
                "attribute vec2 vCoord;\n"+
                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "attribute vec3 vNormal;  \n \n"+
                "varying vec4 vDiffuse;  \n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition,1);\n"+
                "}";
        String fragmentShaderCode ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "uniform sampler2D vTexture;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "vec4 finalColor=vec4(1.0);\n"+
                "gl_FragColor= vec4(1.0,0.15,0.15,1.0);\n"+
                "}";


        // this.program= AFilter.uCreateGlProgram(vertexShaderCode,fragmentShaderCode);





        this.vShader= GLES20.glCreateShader(GLES20.GL_VERTEX_SHADER);
        GLES20.glShaderSource(this.vShader, vertexShaderCode);
        GLES20.glCompileShader(this.vShader);

        this.fShader=   GLES20.glCreateShader(GLES20.GL_FRAGMENT_SHADER);
        GLES20.glShaderSource(this.fShader, fragmentShaderCode);
        GLES20.glCompileShader(this.fShader);


        int e = GLES20.glCreateProgram();
        this.program = GLES20.glCreateProgram();
        GLES20.glAttachShader(this.program, this.vShader);
        GLES20.glAttachShader(this.program, this.fShader);
        GLES20.glLinkProgram(this.program);


        String proLog=  GLES20.glGetProgramInfoLog(this.program);
        String vLog=  GLES20.glGetShaderInfoLog(this.vShader);
        String fLog=  GLES20.glGetShaderInfoLog(this.fShader);

        */

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vCoord;\n"+
                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition*0.2,1);\n"+

                "}";
        String   fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(0.0,0.0,1.0,1.0);\n"+
                "}";

        this.program= AFilter.uCreateGlProgram(vertex,fragment);

        int mHPosition= GLES20.glGetAttribLocation(this.program, "vPosition");
        int  mHCoord=GLES20.glGetAttribLocation(this.program,"vCoord");
        int mHMatrix=GLES20.glGetUniformLocation(this.program,"vMatrix");
        int mHTexture=GLES20.glGetUniformLocation(this.program,"vTexture");


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

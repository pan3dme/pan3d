package com.z3d.program;


import android.opengl.GLES20;
import android.transition.Scene;

import com.z3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.List;


public class Shader3D {

    public static  String v3Position="v3Position";
    public static  String v2TexCoord="v2TexCoord";
    public static  String v3Normal="v3Normal";
    public static  String vpMatrix3D="vpMatrix3D";
    public static  String viewMatrix="viewMatrix";
    public static  String camMatrix="camMatrix";
    public static  String modeMatrix="modeMatrix";
    public static  String posMatrix="posMatrix";


    public int program;
    public List<Boolean> paramAry;
    public String fragment;
    public String vertex;
    public Scene3D scene3D;
    public Shader3D(Scene3D val){
        scene3D=val;
    }
    public String vertexStr(){
        if(this.vertex!=null){
            return this.vertex;
        }else{
            return this.getVertexShaderString();
        }
    }

    public boolean encode() {

        return encodeVstr();

    }
    public boolean  encodeVstr(){
        return  encodeVstr(null,null);
    }
    public boolean  encodeVstr(String vstr,String fstr)
    {
        if(vstr==null){
            vstr=this.getVertexShaderString();
        }
        if(fstr==null){
            fstr=this.getFragmentShaderString();
        }
        this.vertex=vstr;
        this.fragment=fstr;
        scene3D.progrmaManager.addWaitArr(this);
        return true;
    }


    //创建GL程序
    public static int uCreateGlProgram(String vertexSource, String fragmentSource){

        int vertex=uLoadShader(GLES20.GL_VERTEX_SHADER,vertexSource);
        if(vertex==0)return 0;
        int fragment=uLoadShader(GLES20.GL_FRAGMENT_SHADER,fragmentSource);
        if(fragment==0)return 0;
        int program= GLES20.glCreateProgram();
        if(program!=0){
            GLES20.glAttachShader(program,vertex);
            GLES20.glAttachShader(program,fragment);
            GLES20.glLinkProgram(program);

        }
        return program;
    }

    //加载shader
    public static int uLoadShader(int shaderType, String source){
        int shader= GLES20.glCreateShader(shaderType);
        if(0!=shader){
            GLES20.glShaderSource(shader,source);
            GLES20.glCompileShader(shader);
        }
        return shader;
    }


    public String getVertexShaderString() {
        return "";
    }
    public String getFragmentShaderString() {
        return "";
    }
    public void destory() {

    }
}

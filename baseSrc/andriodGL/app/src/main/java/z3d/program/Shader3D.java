package z3d.program;


import android.opengl.GLES20;

import java.util.ArrayList;
import java.util.List;

import z3d.material.TextureRes;


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
        this.program= uCreateGlProgram( this.vertex, this.fragment);

        Shader3D._waitArr.add(this);
        return true;
    }
    private static List<Shader3D> _waitArr=new ArrayList<>();
    public static void upDataProgramWaitIng(){
        while (_waitArr.size()>0){
            Shader3D shader3D=   _waitArr.remove(0);
            shader3D.program= uCreateGlProgram( shader3D.vertex, shader3D.fragment);
        }
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

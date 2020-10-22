package z3d.core;

import android.opengl.GLES20;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.ShortBuffer;
import java.util.List;

import z3d.program.Shader3D;

public class Context3D {


    public void pushVa(FloatBuffer buf)
    {

    }
    public void  setProgame(int program)
    {
        GLES20.glUseProgram(program);
    }

    public void  setVa(Shader3D shader3d ,  String name , int dataWidth,FloatBuffer dataBuffer)
    {
        int a1=GLES20.glGetAttribLocation(shader3d.program, name);
        if(a1==-1){
          //  Log.d("有错", "setVa: "+name);
        }
        GLES20.glEnableVertexAttribArray(a1);
        GLES20.glVertexAttribPointer(a1,dataWidth, GLES20.GL_FLOAT, false, dataWidth*4, dataBuffer);
    }

    public  void  setDepthTest(boolean tf)
    {
        if(tf){
            GLES20.glEnable(GLES20.GL_DEPTH_TEST);
        }else
        {
            GLES20.glEnable(GLES20.GL_DEPTH_TEST);
        }
    }
    public  void  setWriteDepth(boolean tf)
    {
        if(tf){
            GLES20.glDepthFunc(GLES20.GL_LESS);
        }else
        {
            GLES20.glDepthFunc(GLES20.GL_LESS);
        }
    }


    public  void  setFrontFace(boolean tf)
    {
        if(tf){
            GLES20.glFrontFace(GLES20.GL_CW);
        }else
        {
            GLES20.glFrontFace(GLES20.GL_CCW);
        }
    }

    public void  setRenderTexture(Shader3D shader3D,String name,int texTureId,int level)
    {
        int textureSlot= GLES20.glGetUniformLocation(shader3D.program,name);

      // Log.d("name3333333->"+  name, "slot=>"+textureSlot +"  level=> "+level);

        switch (level) {
            case 0:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE0);
                break;
            case 1:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE1);
                break;
            case 2:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE2);
                break;
            case 3:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE3);
                break;
            case 4:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE4);
                break;
            case 5:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE5);
                break;
            case 6:
                GLES20.glActiveTexture(GLES20.GL_TEXTURE6);
                break;
            default:
                break;
        }

        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,texTureId);
        GLES20.glUniform1i(textureSlot,level);
    }

    public void  setVcMatrix4fv(Shader3D shader3d, String name , float[] m)
    {
        GLES20.glUniformMatrix4fv(GLES20.glGetUniformLocation(shader3d.program,name),1,false,m,0);
    }
    public void  setVc4fv(Shader3D shader3d, String name,int count , FloatBuffer m)
    {
        GLES20.glUniform4fv(GLES20.glGetUniformLocation(shader3d.program,name),count,m);



    }
    public void  setVc3fv(Shader3D shader3d, String name,int count , FloatBuffer m)
    {
        GLES20.glUniform3fv(GLES20.glGetUniformLocation(shader3d.program,name),count,m);
    }
    public void  setVcUniform4f(Shader3D shader3d, String name,float x,float y,float z,float w)
    {
        GLES20.glUniform4f(GLES20.glGetUniformLocation(shader3d.program,name),x,y,z,w);
    }

    public void drawCall(ShortBuffer dataBuffer, int num)
    {


        GLES20.glDrawElements(GLES20.GL_TRIANGLES,       num, GLES20.GL_UNSIGNED_SHORT,dataBuffer);


    }

    public void setBlendParticleFactors(float type) {
        GLES20.glEnable(GLES20.GL_BLEND);
        switch ((int)type) {
            case 0:
                GLES20.glBlendFunc( GLES20.GL_ONE,  GLES20.GL_ONE_MINUS_SRC_ALPHA);
                break;
            case 1:
                GLES20.glBlendFunc( GLES20.GL_ONE,  GLES20.GL_ONE);
                break;
            case 2:
                GLES20.glBlendFunc( GLES20.GL_DST_COLOR,  GLES20.GL_ZERO);
                break;
            case 3:
                GLES20.glBlendFunc( GLES20.GL_ONE,  GLES20.GL_ONE_MINUS_SRC_COLOR);
                break;
            case 4:
                GLES20.glBlendFunc( GLES20.GL_SRC_ALPHA,  GLES20.GL_ONE);
                break;
            case -1:
                GLES20.glBlendFunc( GLES20.GL_SRC_ALPHA,  GLES20.GL_ONE_MINUS_SRC_ALPHA);
                break;
        }
    }

    public void cullFaceBack(boolean tf) {
        if (tf) {
            GLES20.glEnable(GLES20.GL_CULL_FACE);
            GLES20.glCullFace(GLES20.GL_BACK);
        } else {
            GLES20.glDisable(GLES20.GL_CULL_FACE);
        }
    }

}

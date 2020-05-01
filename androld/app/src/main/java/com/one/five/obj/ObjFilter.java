package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;


/**
 * Created by wuwang on 2017/1/8
 */

public class ObjFilter extends BaseDisplaySprite {


    private Obj3D obj;

    public ObjFilter(Resources mRes) {
        super(mRes);
    }

    public void setObj3D(Obj3D obj){


        ArrayList<Float> alvResult=new ArrayList<Float>();//结果顶点坐标列表
        alvResult.add(0f);
        alvResult.add(30f);
        alvResult.add(0f);

        alvResult.add(30f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(0f);
        alvResult.add(0f);
        alvResult.add(10f);


        alvResult.add(0f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(10f);
        alvResult.add(10f);
        alvResult.add(0f);

        alvResult.add(0f);
        alvResult.add(10f);
        alvResult.add(10f);

        this.obj=new Obj3D();
        setVert(alvResult);


    }
    public void setVert(ArrayList<Float> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*4);
        buffer.order(ByteOrder.nativeOrder());
        obj.vert=buffer.asFloatBuffer();
        for (int i=0;i<size;i++){
            obj.vert.put(data.get(i));
        }
        obj.vert.position(0);
        obj.vertCount=size/3;
    }

    @Override
    protected void onCreate() {


     String vertex= "attribute vec3 vPosition;\n"+

                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition*0.1,1);\n"+

                "}";


        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1.0,0.0,0.0,1.0);\n"+
                "}";

        createProgram (vertex,fragment);




    }


    @Override
    protected void onDraw() {
        GLES20.glEnableVertexAttribArray(mHPosition);
        GLES20.glVertexAttribPointer(mHPosition,3, GLES20.GL_FLOAT, false, 3*4,obj.vert);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES,0,obj.vertCount);
        GLES20.glDisableVertexAttribArray(mHPosition);

    }

    @Override
    public void onSizeChanged(int width, int height) {
        GLES20.glViewport(0,0,width,height);
    }


}

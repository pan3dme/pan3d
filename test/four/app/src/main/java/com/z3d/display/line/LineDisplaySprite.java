package com.z3d.display.line;

import android.opengl.GLES20;
import android.util.Log;

import com.z3d.base.ObjData;
import com.z3d.core.Context3D;
import com.z3d.display.basedis.DisplayBaseSprite;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;

public class LineDisplaySprite extends DisplayBaseSprite {

    public Vector3D baseColor;
    LineDisplaySprite(Scene3D val){
        super(val);
        scene3D.progrmaManager.registe(LineDisplayShader.shaderNameStr,new LineDisplayShader(scene3D));
        this.shader3D=this.scene3D.progrmaManager.getProgram(LineDisplayShader.shaderNameStr);
    }


    protected void  initData()
    {
        baseColor=new Vector3D(1.0f,0.0f,1.0f);
        this.objData =new ObjData(scene3D);
        this.clearLine();


        this.makeLineMode(new Vector3D(0,0 ,0) ,new Vector3D(500,0,0));
        this.makeLineMode(new Vector3D(0,0 ,0) ,new Vector3D(0,100,0));

        this.upLineDataToGpu();
    }

    public void  upLineDataToGpu()
    {
        this.objData.upToGup();
    }
    public  void clearLine()
    {

        this.objData.verticeslist=new ArrayList<Float>();//结果顶点坐标列表
        this.objData.normals=new ArrayList<Float>();//结果顶点坐标列表
        this.objData.indexs=new ArrayList<Short>();
    }
    public  void  makeLineMode(Vector3D a, Vector3D b )
    {
        this.makeLineMode(a, b,this.baseColor);
    }
    public  void  makeLineMode(Vector3D a, Vector3D b, Vector3D c)
    {
        this.objData.verticeslist.add(a.x );
        this.objData.verticeslist.add(a.y );
        this.objData.verticeslist.add(a.z );

        this.objData.verticeslist.add(b.x );
        this.objData.verticeslist.add(b.y );
        this.objData.verticeslist.add(b.z );


        this.objData.normals.add(c.x );
        this.objData.normals.add(c.y );
        this.objData.normals.add(c.z );

        this.objData.normals.add(c.x );
        this.objData.normals.add(c.y );
        this.objData.normals.add(c.z );


        this.objData.indexs.add((short) this.objData.indexs.size());
        this.objData.indexs.add((short) this.objData.indexs.size());
        this.objData.isCompile=false;
    }


    public void upData(){


        if(this.shader3D!=null&&this.objData.treNum>0){
            Context3D ctx=this.scene3D.context3D;
            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);



            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vColorv3d",3,this.objData.normalsBuffer);

            GLES20.glDrawElements(GLES20.GL_LINES,this.objData.treNum, GLES20.GL_UNSIGNED_SHORT,this.objData.indexBuffer);

        }


    }
}

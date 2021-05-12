package com.pan3d.display.basedis;

import com.pan3d.base.ObjData;
import com.pan3d.core.Context3D;
import com.pan3d.display.Display3D;
import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Matrix3D;
import com.pan3d.vo.Vector3D;

import java.util.ArrayList;

public class DisplayTestSprite extends Display3D {
    private static final String TAG="Filter";

    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;


    public DisplayTestSprite(Scene3D val){
        super(val);
        this.modeMatrix=new Matrix3D();
        scene3D.progrmaManager.registe(DisplayTestShader.shaderNameStr,new DisplayTestShader(scene3D));
         scene3D.progrmaManager.getProgram(DisplayTestShader.shaderNameStr);
        this.initData();
    }
    protected void  initData()
    {

        this.makeTempObjData();
    }
    protected void  makeTempObjData()
    {
        this.objData =new ObjData(scene3D);

        ObjData od=this.objData;

        od.verticeslist=new ArrayList<Float>();//结果顶点坐标列表
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(100f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(100f);
        od.verticeslist.add(100f);
        od.verticeslist.add(0f);

        od.uvlist=new ArrayList<Float>();//结果顶点坐标列表
        od.uvlist.add(0.5f);
        od.uvlist.add(1f);

        od.uvlist.add(0.5f);
        od.uvlist.add(1f);

        od.uvlist.add(0.5f);
        od.uvlist.add(1f);



        od.indexs=new ArrayList<Short>();
        od.indexs.add((short)0);
        od.indexs.add((short)1);
        od.indexs.add((short)2);



        od.upToGup();


    }



    public void upData(){
        Context3D ctx= scene3D.context3D;

        if(this.shader3D!=null){

            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);

            Matrix3D m=new Matrix3D();
            m.appendScale(10,10,0);


            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D", scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);



            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vTextCoord",2,this.objData.uvBuffer);

            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);


        }


    }



}

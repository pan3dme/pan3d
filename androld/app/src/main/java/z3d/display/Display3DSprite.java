package z3d.display;

import android.opengl.GLES20;

import com.one.five.utils.MatrixUtils;

import java.util.ArrayList;
import java.util.Arrays;

import z3d.base.ObjData;
import z3d.core.Context3D;

import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public   class Display3DSprite extends Display3D {

    private static final String TAG="Filter";

    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;


    private int skipNum;
    public Display3DSprite( ){

        this.skipNum=0;
        this.modeMatrix=new Matrix3D();
        this.registetProgame();
        this.makeTempObjData();
    }
    private void  makeTempObjData()
    {
        this.objData =new ObjData();

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


        od.indexs=new ArrayList<Short>();
        od.indexs.add((short)0);
        od.indexs.add((short)1);
        od.indexs.add((short)2);



        od.upToGup();


    }

    private void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(Display3DShader.shaderStr,new Display3DShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(Display3DShader.shaderStr);

    }

    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;

        if(this.shader3D!=null){

            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);

            Matrix3D m=new Matrix3D();
            m.appendScale(10,10,0);


            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);

            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);


            GLES20.glDisableVertexAttribArray(0);
        }


    }



}

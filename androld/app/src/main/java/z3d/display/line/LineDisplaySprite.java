package z3d.display.line;

import android.opengl.GLES20;

import java.util.ArrayList;

import z3d.base.ObjData;
import z3d.core.Context3D;
import z3d.display.basedis.DisplayBaseShader;
import z3d.display.basedis.DisplayBaseSprite;
import z3d.program.ProgrmaManager;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class LineDisplaySprite extends DisplayBaseSprite {


//    @property (nonatomic, strong) Vector3D* colorV3d;
//-(void)clearLine;
//-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;

    private Vector3D colorV3d;


    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(LineDisplayShader.shaderNameStr,new LineDisplayShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(LineDisplayShader.shaderNameStr);

    }
    public  LineDisplaySprite()
    {
        super();
        this.onCreated();
    }
    protected void  onCreated()
    {

        this.clearLine();
        this.colorV3d=new Vector3D(1,0,0);

        this.addLineA2B(new Vector3D(0,0 ,0) ,new Vector3D(100,0,0));
        this.addLineA2B(new Vector3D(0,0 ,0) ,new Vector3D(0,100,0));

    }

    public  void clearLine()
    {

    }
    public  void  addLineA2B(Vector3D a, Vector3D b)
    {

    }
    protected void  makeTempObjData()
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




        od.indexs=new ArrayList<Short>();
        od.indexs.add((short)0);
        od.indexs.add((short)1);




        od.upToGup();


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
            ctx.setVaOffset(this.shader3D, "vPosition");
            ctx.setVa(0,3,this.objData.vertexBuffer);



         //  GLES20.glDrawElements(GLES20.GL_TRIANGLES,this.objData.treNum, GLES20.GL_UNSIGNED_SHORT,this.objData.indexBuffer);

           GLES20.glDrawElements(GLES20.GL_LINES,2, GLES20.GL_UNSIGNED_SHORT,this.objData.indexBuffer);



            GLES20.glDisableVertexAttribArray(0);
        }


    }
}

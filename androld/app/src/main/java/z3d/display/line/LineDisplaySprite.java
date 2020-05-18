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

    public Vector3D baseColor=new Vector3D(1,0,1);

    public LineDisplaySprite()
    {

        super();

    }
    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(LineDisplayShader.shaderNameStr,new LineDisplayShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(LineDisplayShader.shaderNameStr);
    }

    protected void  initData()
    {

        this.objData =new ObjData();
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
    public  void  makeLineMode(Vector3D a, Vector3D b,Vector3D c)
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

    }


    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;

        if(this.shader3D!=null&&this.objData.treNum>0){

            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);



            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vColorv3d",3,this.objData.normalsBuffer);

            GLES20.glDrawElements(GLES20.GL_LINES,this.objData.treNum, GLES20.GL_UNSIGNED_SHORT,this.objData.indexBuffer);
            GLES20.glDisableVertexAttribArray(0);
        }


    }
}

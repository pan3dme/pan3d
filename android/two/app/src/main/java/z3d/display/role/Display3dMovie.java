package z3d.display.role;

import android.opengl.GLES20;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.CallBackFun;
import z3d.base.MeshData;
import z3d.base.ObjData;
import z3d.base.SkinMeshBackFun;
import z3d.core.Context3D;
import z3d.display.Display3DShader;
import z3d.display.Display3DSprite;
import z3d.display.basedis.DisplayBaseShader;
import z3d.display.basedis.DisplayBaseSprite;
import z3d.display.basedis.DisplayTestShader;
import z3d.display.line.GridLineSprite;
import z3d.filemodel.MeshDataManager;
import z3d.program.MaterialAnimShader;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.vo.AnimData;
import z3d.vo.DualQuatFloat32Array;
import z3d.vo.Matrix3D;
import z3d.vo.SkinMesh;
import z3d.vo.Vector3D;

public class Display3dMovie extends Display3DSprite {

    public static  String TAG="Display3dMovie";
    public SkinMesh skinMesh;
    public float fileScale;
    public HashMap animDic;
    public boolean meshVisible;
    public  String curentAction;
    public  String defaultAction="stand";
    public  int curentFrame;
//    public Shader3D md5shader3D;
    public  Display3dMovie()
    {
        this.meshVisible=true;
        this.curentFrame=0;
    }
    public void  setRoleUrl(String url)
    {
        MeshDataManager.getInstance().getMeshData(url, new SkinMeshBackFun() {
            @Override
            public void Bfun(SkinMesh value) {
                skinMesh=value;
                fileScale=skinMesh.fileScale;
                animDic = skinMesh.animDic;
                updateMatrix();

            }
        }, 1);

    }

    @Override
    public void upFrame() {

        if(this.skinMesh==null){
            return;
        }
        //this.updateBind();
        if(this.meshVisible){
            for (int i = 0; i < this.skinMesh.meshAry.size(); i++) {
                this.updateMaterialMesh(this.skinMesh.meshAry.get(i));
            }
        }

    }
    private GridLineSprite gridline;

    protected void  updateMaterialMesh(MeshData mesh)
    {
        if(!mesh.isCompile){
            mesh.AsyncCxtDtata();
            return;
        }
        if (mesh.material==null ) {
            Log.d(TAG, "没有: ");
            return;
        }


        this.shader3D=mesh.material.shader;
        Context3D ctx=this.scene3d.context3D;
        ctx.setDepthTest(true);
        ctx.setWriteDepth(true);

        ctx.setProgame(this.shader3D.program);
        this.setVc();
        this.setMaterialTexture(mesh.material,mesh.materialParam);
        this.setMeshVc(mesh);
        ctx.setVa(this.shader3D,"pos",3,mesh.vertexBuffer);
        ctx.setVa(this.shader3D,"v2Uv",2,mesh.uvBuffer);
        ctx.setVa(this.shader3D,"boneID",4,mesh.boneIdBuffer);
        ctx.setVa(this.shader3D,"boneWeight",4,mesh.boneWeightBuffer);
        ctx.drawCall(mesh.indexBuffer,mesh.treNum);



    }

    protected void setVc()
    {
        Context3D ctx=this.scene3d.context3D;
        this.modeMatrix=new Matrix3D();
        this.modeMatrix.appendScale(0.1f,0.1f,0.1f);
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

    }
    private  void setMeshVc(MeshData mesh)
    {

        AnimData  animData;
        if (this.animDic.containsKey(this.curentAction)) {
            animData = (AnimData)this.animDic.get(this.curentAction);
        } else if (this.animDic.containsKey(this.defaultAction)) {
            animData =(AnimData) this.animDic.get(this.defaultAction);
        } else {
            return;
        }
        this.curentFrame++;
        if( this.curentFrame>animData.boneQPAry.get(mesh.uid).size()-1){
            this.curentFrame=0;
        }
        DualQuatFloat32Array dualQuatFrame =  animData.boneQPAry.get(mesh.uid).get(this.curentFrame);

        if(dualQuatFrame.boneDarrBuff==null){
            dualQuatFrame.boneDarrBuff=this.upGpuvertexBufferbbb(dualQuatFrame.quatArr);
        }
        if(dualQuatFrame.boneQarrBuff==null){
            dualQuatFrame.boneQarrBuff=this.upGpuvertexBufferbbb(dualQuatFrame.posArr);
        }
        Context3D ctx=this.scene3d.context3D;
        ctx.setVc4fv(this.shader3D,"boneQ",54, dualQuatFrame.boneDarrBuff);
        ctx.setVc3fv(this.shader3D,"boneD",54, dualQuatFrame.boneQarrBuff);


    }
    public FloatBuffer upGpuvertexBufferbbb(List<Float> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*4);
        buffer.order(ByteOrder.nativeOrder());
        FloatBuffer verBuff=buffer.asFloatBuffer();
        for (int i=0;i<size;i++){
            verBuff.put(data.get(i));
        }
        verBuff.position(0);
        return verBuff;

    }
    private  void setVaCompress(MeshData mesh)
    {



    }


}

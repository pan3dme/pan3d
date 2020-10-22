package z3d.display.role;
import android.util.Log;
import java.util.HashMap;
import z3d.base.MeshData;
import z3d.base.Scene_data;
import z3d.base.SkinMeshBackFun;
import z3d.core.Context3D;
import z3d.display.Display3DSprite;
import z3d.filemodel.MeshDataManager;
import z3d.scene.Scene3D;
import z3d.vo.AnimData;
import z3d.vo.DualQuatFloat32Array;
import z3d.vo.Matrix3D;
import z3d.vo.SkinMesh;
public class Display3dMovie extends Display3DSprite {
    public static  String TAG="Display3dMovie";
    public SkinMesh skinMesh;
    public float fileScale;
    public HashMap animDic;
    public boolean meshVisible;
    public  String curentAction;
    public  String defaultAction="stand";
    public  int curentFrame;
    public  float actionTime;
    public int  completeState;
    public  Display3dMovie(Scene3D val)
    {
        super(val);
        this.meshVisible=true;
        this.curentFrame=0;
        this.actionTime=0;
        this.completeState=0;
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
    public void upData() {
        if(this.skinMesh==null){
            return;
        }
        if(this.scene3d==null){
            return;
        }
        //this.updateBind();
        if(this.meshVisible){
            for (int i = 0; i < this.skinMesh.meshAry.size(); i++) {
                this.updateMaterialMesh(this.skinMesh.meshAry.get(i));
            }
        }

    }
    public void   updateFrame(float t){
        this.actionTime+=t;
        if(this.skinMesh==null){
            return;
        }
        AnimData  animData=_getCurentAnimData();
        if (animData==null) {
            return;
        }
        this.curentFrame=(int)(this.actionTime/(Scene_data.frameTime*1.5) );
        if (this.curentFrame >= animData.matrixAry.size()) {
            if (this.completeState == 0) {
                this.actionTime = 0;
                this.curentFrame = 0;
            } else if (this.completeState == 1) {
                this.curentFrame =(int) animData.matrixAry.size() - 1;
            } else if (this.completeState == 2) {
                this.curentFrame = 0;
                this.completeState = 0;
            } else if (this.completeState == 3) {
            }
        }

    }
    protected void  updateMaterialMesh(MeshData mesh)
    {
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
        this.modeMatrix.appendScale(0.25f,0.25f,0.25f);
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

    }
    private AnimData  _getCurentAnimData(){
        this.curentAction="walk";
        AnimData  animData = null;
        if (this.animDic.containsKey(this.curentAction)) {
            animData = (AnimData)this.animDic.get(this.curentAction);
        } else if (this.animDic.containsKey(this.defaultAction)) {
            animData =(AnimData) this.animDic.get(this.defaultAction);
        }
        return animData;
    }

    private  void setMeshVc(MeshData mesh)
    {
        AnimData  animData=_getCurentAnimData();
        if (animData==null) {
            return;
        }
        DualQuatFloat32Array dualQuatFrame =  animData.boneQPAry.get(mesh.uid).get(this.curentFrame);
        Context3D ctx=this.scene3d.context3D;
        ctx.setVc4fv(this.shader3D,"boneQ",54, dualQuatFrame.boneDarrBuff);
        ctx.setVc3fv(this.shader3D,"boneD",54, dualQuatFrame.boneQarrBuff);

    }




}

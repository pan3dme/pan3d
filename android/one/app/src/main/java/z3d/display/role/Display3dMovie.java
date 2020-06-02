package z3d.display.role;

import android.opengl.GLES20;
import android.util.Log;

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
import z3d.display.basedis.DisplayBaseSprite;
import z3d.filemodel.MeshDataManager;
import z3d.program.MaterialAnimShader;
import z3d.program.ProgrmaManager;
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
    public  Display3dMovie()
    {
        this.meshVisible=true;
    }
    public void  setRoleUrl(String url)
    {
        MeshDataManager.getInstance().getMeshData(url, new SkinMeshBackFun() {
            @Override
            public void Bfun(SkinMesh value) {
                skinMesh=value;
                fileScale=skinMesh.fileScale;
                animDic = skinMesh.animDic;
                for (int i = 0; i <  skinMesh.meshAry.size(); i++) {
                    skinMesh.meshAry.get(i).upToGup();
                }

                onMeshLoaded();
                updateMatrix();
            }
        }, 1);

    }
    private void onMeshLoaded()
    {


        ProgrmaManager.getInstance().registe(MaterialAnimShader.shaderStr,new MaterialAnimShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(MaterialAnimShader.shaderStr);


    }

    @Override
    public void upFrame() {

        if(this.skinMesh==null){
            return;
        }
        this.updateBind();
        if(this.meshVisible){
            for (int i = 0; i < this.skinMesh.meshAry.size(); i++) {
                this.updateMaterialMesh(this.skinMesh.meshAry.get(i));
            }
        }

    }
    private DisplayBaseSprite  tempDIc;

    protected void  updateMaterialMesh(MeshData mesh)
    {
        if (mesh.material==null) {
            Log.d(TAG, "没有: ");
            return;
        }
        /*
        Context3D ctx=this.scene3d.context3D;
       this.shader3D=mesh.material.shader;
        ctx.setProgame(this.shader3D.program);
        this.setMaterialTexture(mesh.material,mesh.materialParam);
        this.setMaterialVc(mesh.material,mesh.materialParam);
        this.setVc();
        this.setMeshVc(mesh);
        this.setVaCompress(mesh);

        */

        if (this.tempDIc == null) {
            this.tempDIc = new DisplayBaseSprite();
            this.tempDIc.scene3d=this.scene3d;
        } else
        {

           this.tempDIc.upFrame();


           /*
            Context3D ctx=this.scene3d.context3D;
            this.shader3D=this.tempDIc.shader3D;
            ctx.setProgame(this.shader3D.program);
            this.setMaterialTexture(mesh.material,mesh.materialParam);
            this.setMaterialVc(mesh.material,mesh.materialParam);
            this.setVc();
            ctx.setVa(this.shader3D,"vPosition",3,mesh.vertexBuffer);
            ctx.drawCall(mesh.indexBuffer,333*3);

            */

        }



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
        this.curentFrame=0;


        DualQuatFloat32Array dualQuatFrame =  animData.boneQPAry.get(mesh.uid).get(this.curentFrame);


        Log.d(TAG, "dd");



    /*
    [context3D setVc4fv:self.shader3d name:"boneQ" data:boneQarr len:54];
    [context3D setVc3fv:self.shader3d name:"boneD" data:boneDarr len:54];
         */


    }
    private  void setVaCompress(MeshData mesh)
    {



    }


}

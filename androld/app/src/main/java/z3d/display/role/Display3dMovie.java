package z3d.display.role;

import android.util.Log;

import java.util.HashMap;

import z3d.base.CallBackFun;
import z3d.base.MeshData;
import z3d.base.SkinMeshBackFun;
import z3d.core.Context3D;
import z3d.display.Display3DSprite;
import z3d.filemodel.MeshDataManager;
import z3d.vo.SkinMesh;

public class Display3dMovie extends Display3DSprite {

    public static  String TAG="Display3dMovie";
    public SkinMesh skinMesh;
    public float fileScale;
    public HashMap animDic;
    public boolean meshVisible;

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
    protected void  updateMaterialMesh(MeshData mesh)
    {
        if (mesh.material==null) {
            Log.d(TAG, "没有: ");
            return;
        }
        Context3D ctx=this.scene3d.context3D;
        this.shader3D=mesh.material.shader;
        ctx.setProgame(this.shader3D.program);
         this.setMaterialTexture(mesh.material,mesh.materialParam);
        this.setMaterialVc(mesh.material,mesh.materialParam);
        this.setVc();
        this.setMeshVc(mesh);
        this.setVaCompress(mesh);



    }
    private  void setMeshVc(MeshData mesh)
    {

    }
    private  void setVaCompress(MeshData mesh)
    {

    }


}

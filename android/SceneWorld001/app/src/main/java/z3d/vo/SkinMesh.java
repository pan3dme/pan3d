package z3d.vo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.CallBackFun;
import z3d.base.MeshData;
import z3d.base.Scene_data;
import z3d.engine.ResCount;
import z3d.material.Material;
import z3d.material.MaterialBackFun;
import z3d.material.MaterialBaseParam;
import z3d.material.MaterialManager;
import z3d.program.MaterialAnimShader;
import z3d.program.MaterialShader;
import z3d.units.AnimManager;

public class SkinMesh extends ResCount {

    public List<MeshData> meshAry ;
    public List<Matrix3D> bindPosMatrixAry;
    public List<Matrix3D> bindPosInvertMatrixAry;
    public HashMap boneSocketDic;
    public float fileScale ;
    public float tittleHeight ;
    public Vector2D hitBox ;
    public int type ;
    public HashMap animDic ;
    public boolean ready ;
    public List<String>  animUrlAry ;
    public List<List<Float> >  lightData ;
    public List<Vector3D> hitPosItem;
    public HashMap allParticleDic;
    public String url;
    public boolean hasDestory ;
    public SkinMesh()
    {
        super();
        this.animDic=new HashMap();
        this.meshAry=new ArrayList<>();
    }
    public void makeHitBoxItem()
    {

    }
    public void addMesh(MeshData $mesh)
    {
        $mesh.uid = this.meshAry.size();
        this.meshAry.add($mesh);
    }
    public  void  loadMaterial(){
        for (int i = 0; i < this.meshAry.size(); i++){
            this.loadByteMeshDataMaterial(meshAry.get(i),null);
        }
    }

    private void loadByteMeshDataMaterial(MeshData meshData, CallBackFun backFun) {

        MaterialManager.getInstance().getMaterialByte(meshData.materialUrl, new MaterialBackFun() {
            @Override
            public void Bfun(Material value) {
                meshData.material = value;
                meshData.materialParam = new MaterialBaseParam();
                meshData.materialParam.setData(value, meshData.materialParamData);
            }
        },true, MaterialAnimShader.shaderNameStr, new MaterialAnimShader());

    }

    public  void  setAction(List<String> actionAry,String roleUrl )
    {
        this.animUrlAry=new ArrayList<>();
        for (int i = 0; i < actionAry.size(); i++) {
            String name  = actionAry.get(i);
            String url = roleUrl +name;
            AnimData anim=  AnimManager.getInstance().getAnimDataImmediate(url);
            anim.processMesh(this);
            this.animDic.put(name,anim);
            this.animUrlAry.add(url);
        }
    }


}

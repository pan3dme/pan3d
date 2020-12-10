package com.z3d.vo;

import com.z3d.base.CallBackFun;
import com.z3d.base.MeshData;
import com.z3d.engine.ResCount;
import com.z3d.material.Material;
import com.z3d.material.MaterialBackFun;
import com.z3d.material.MaterialBaseParam;
import com.z3d.program.MaterialAnimShader;
import com.z3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SkinMesh extends ResCount {

    public List<MeshData> meshAry ;
    public List<Matrix3D> bindPosMatrixAry;
    public List<Matrix3D> bindPosInvertMatrixAry;
    public HashMap<String, BoneSocketData> boneSocketDic;
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
    public SkinMesh(Scene3D val)
    {
        super(val);
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

        scene3D.materialManager.getMaterialByte(meshData.materialUrl, new MaterialBackFun() {
            @Override
            public void Bfun(Material value) {
                meshData.material = value;
                meshData.materialParam = new MaterialBaseParam(scene3D);
                meshData.materialParam.setData(value, meshData.materialParamData);
            }
        },true, MaterialAnimShader.shaderNameStr, new MaterialAnimShader(scene3D));

    }

    public  void  setAction(List<String> actionAry,String roleUrl )
    {
        this.animUrlAry=new ArrayList<>();
        for (int i = 0; i < actionAry.size(); i++) {
            String name  = actionAry.get(i);
            String url = roleUrl +name;
            AnimData anim=  scene3D.animManager.getAnimDataImmediate(url);
            anim.processMesh(this);
            this.animDic.put(name,anim);
            this.animUrlAry.add(url);
        }
    }


}

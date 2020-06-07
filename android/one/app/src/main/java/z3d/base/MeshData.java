package z3d.base;

import android.util.Log;

import java.nio.FloatBuffer;
import java.util.List;

import z3d.material.Material;
import z3d.material.MaterialBaseParam;
import z3d.vo.BindParticle;

public class MeshData extends ObjData {
    public  List<Float>  boneIDAry ;
    public  List<Float>  boneWeightAry;
    public FloatBuffer boneWeightBuffer ;
    public FloatBuffer boneIdBuffer ;
    public  List<Short>  boneNewIDAry;
    public String materialUrl;
    public List materialParamData  ;
    public MaterialBaseParam materialParam;
    public List<BindParticle> particleAry;
    public int uid;
    public int boneIDOffsets;
    public int boneWeightOffsets;
    public Material material;

    public void  upToGup()
    {
        if(!this.isCompile){
            int a=this.uvlist.size()/2;
            int b=this.verticeslist.size()/3;

            this.vertexBuffer=this.upGpuvertexBufferbbb(this.verticeslist);
            this.uvBuffer=this.upGpuvertexBufferbbb(this.uvlist);
            this.indexBuffer=this.upGpuIndexBuffercopy(this.indexs);
            this.treNum= this.indexs.size();
            this.isCompile=true;
        }


    }
}

package z3d.base;

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
            this.vertexBuffer=this.upGpuvertexBufferbbb(this.verticeslist);

            this.isCompile=true;
        }


    }
}

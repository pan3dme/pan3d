package z3d.base;

import java.nio.FloatBuffer;
import java.util.List;

import z3d.material.Material;
import z3d.material.MaterialBackFun;
import z3d.material.MaterialBaseParam;
import z3d.material.MaterialManager;
import z3d.program.MaterialAnimShader;
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

        this.vertexBuffer=this.upGpuvertexBufferbbb(this.verticeslist);
        this.uvBuffer=this.upGpuvertexBufferbbb(this.uvlist);
        this.indexBuffer=this.upGpuIndexBuffercopy(this.indexs);
        this.treNum= this.indexs.size();


    }
    public void  AsyncCxtDtata()
    {
        if(!this.isCompile) {
            this.upToGup();
            this.makeMaterial();
            this.isCompile=true;
        }

    }
    private void makeMaterial()
    {
        if (this.material == null) {
            final MeshData that = this;
            MaterialManager.getInstance().getMaterialByte(this.materialUrl, new MaterialBackFun() {
                @Override
                public void Bfun(Material value) {
                    that.material = value;
                    that.materialParam = new MaterialBaseParam();
                    that.materialParam.setData(value, that.materialParamData);
                }
            }, MaterialAnimShader.shaderStr, new MaterialAnimShader());

        }
    }
}

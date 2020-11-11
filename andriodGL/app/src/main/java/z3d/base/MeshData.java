package z3d.base;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import java.util.List;
import z3d.material.Material;
import z3d.material.MaterialBaseParam;
import z3d.res.MaterialInfoVo;
import z3d.vo.BindParticle;
import z3d.vo.Matrix3D;

public class MeshData extends ObjData {
    public  List<Float>  boneIDAry ;
    public  List<Float>  boneWeightAry;
    public FloatBuffer boneWeightBuffer ;
    public FloatBuffer boneIdBuffer ;
    public  List<Short>  boneNewIDAry;
    public String materialUrl;
    public List<MaterialInfoVo> materialParamData  ;
    public MaterialBaseParam materialParam;
    public List<BindParticle> particleAry;
    public int uid;
    public int boneIDOffsets;
    public int boneWeightOffsets;
    public Material material;

    public List<Matrix3D> bindPosAry ;

    public MeshData(){
        super();
        this.particleAry=new ArrayList<>();
    }
    public void  upToGup()
    {
       if( this.isCompile){
           return;
       }
        this.isCompile=true;
        if(this.verticeslist!=null){
            this.vertexBuffer=this.upGpuvertexBuffer(this.verticeslist);
        }
        if(this.uvlist!=null){
            this.uvBuffer=this.upGpuvertexBuffer(this.uvlist);
        }
        if(this.boneIDAry!=null){
            this.boneIdBuffer=this.upGpuvertexBuffer(this.boneIDAry);
        }
        if(this.boneWeightAry!=null){
            this.boneWeightBuffer=this.upGpuvertexBuffer(this.boneWeightAry);
        }
        if(this.indexs!=null){
            this.indexBuffer=this.upGpuIndexBuffer(this.indexs);
            this.treNum= this.indexs.size();
        }

    }

}

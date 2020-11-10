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
        this.vertexBuffer=this.upGpuvertexBuffer(this.verticeslist);
        this.uvBuffer=this.upGpuvertexBuffer(this.uvlist);
        this.boneIdBuffer=this.upGpuvertexBuffer(this.boneIDAry);
        this.boneWeightBuffer=this.upGpuvertexBuffer(this.boneWeightAry);
        this.indexBuffer=this.upGpuIndexBuffer(this.indexs);
        this.treNum= this.indexs.size();
    }

}

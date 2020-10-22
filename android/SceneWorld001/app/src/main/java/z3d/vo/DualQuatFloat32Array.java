package z3d.vo;

import java.nio.FloatBuffer;
import java.util.List;

import z3d.base.ObjData;

public class DualQuatFloat32Array {


    public List<Float> quatArr;
    public List<Float> posArr;

    public FloatBuffer boneDarrBuff;
    public FloatBuffer boneQarrrBuff;

    public  void  upToGpu()
    {
        if(this.boneQarrrBuff ==null){
            this.boneQarrrBuff =ObjData.upGpuvertexBuffer(this.quatArr);
        }
        if(this.boneDarrBuff ==null){
            this.boneDarrBuff = ObjData.upGpuvertexBuffer(this.posArr);
        }

    }

}

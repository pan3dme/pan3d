package z3d.vo;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.List;

import z3d.base.ObjData;
import z3d.core.Context3D;

public class DualQuatFloat32Array {


    public List<Float> quatArr;
    public List<Float> posArr;

    public FloatBuffer boneQarrBuff;
    public FloatBuffer boneDarrBuff;

    public  void  upToGpu()
    {
        if(this.boneDarrBuff==null){
            this.boneDarrBuff=ObjData.upGpuvertexBuffer(this.quatArr);
        }
        if(this.boneQarrBuff==null){
            this.boneQarrBuff= ObjData.upGpuvertexBuffer(this.posArr);
        }

    }

}

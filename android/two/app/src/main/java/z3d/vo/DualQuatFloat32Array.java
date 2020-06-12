package z3d.vo;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.List;

public class DualQuatFloat32Array {


    public List<Float> quatArr;
    public List<Float> posArr;

    public FloatBuffer boneQarrBuff;
    public FloatBuffer boneDarrBuff;

    public  void  upToGpu()
    {
        if(this.boneDarrBuff==null){
            this.boneDarrBuff=this.upGpuvertexBufferbbb(this.quatArr);
        }
        if(this.boneQarrBuff==null){
            this.boneQarrBuff=this.upGpuvertexBufferbbb(this.posArr);
        }

    }
    public FloatBuffer upGpuvertexBufferbbb(List<Float> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*4);
        buffer.order(ByteOrder.nativeOrder());
        FloatBuffer verBuff=buffer.asFloatBuffer();
        for (int i=0;i<size;i++){
            verBuff.put(data.get(i));
        }
        verBuff.position(0);
        return verBuff;

    }
}

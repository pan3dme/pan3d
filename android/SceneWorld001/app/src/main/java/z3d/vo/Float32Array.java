package z3d.vo;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.List;

public class Float32Array   {
    public FloatBuffer verBuff;
    public Float32Array(int num)
    {
        ByteBuffer buffer=ByteBuffer.allocateDirect(num*4);
        buffer.order(ByteOrder.nativeOrder());
        this.verBuff=buffer.asFloatBuffer();
        for (int i=0;i<num;i++){
            verBuff.put(0);
        }
        verBuff.position(0);
    }
    public void put(int idx,float value)
    {
        verBuff.put(idx,value);
    }
    public float get(int idx)
    {
        return verBuff.get(idx);
    }
}

package com.z3d.vo;

import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;

public class Float32Array   {
    private static final String TAG ="Float32Array" ;
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
    public void printOut(){
        String str="";
        for(int i=0;i<verBuff.limit();i++){
            str+=verBuff.get(i)+" ";
        }
        Log.d(TAG, str);
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

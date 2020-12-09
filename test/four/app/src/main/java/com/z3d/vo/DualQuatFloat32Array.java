package com.z3d.vo;

import com.z3d.base.ObjData;

import java.nio.FloatBuffer;
import java.util.List;

public class DualQuatFloat32Array {


    private static final String TAG ="DualQuatFloat32Array" ;
    public List<Float> quatArr;
    public List<Float> posArr;


    public FloatBuffer boneDarrBuff;
    public FloatBuffer boneQarrrBuff;

    public  void  upToGpu()
    {
        if(this.boneQarrrBuff ==null){
            outInfo(quatArr);
            boneQarrrBuff = ObjData.upGpuvertexBuffer(quatArr);
        }
        if(this.boneDarrBuff ==null){
            outInfo(posArr);
            boneDarrBuff = ObjData.upGpuvertexBuffer(posArr);
        }

    }

    private void outInfo(List<Float> arr){
        for(int i=0;i<arr.size();i++){

//            Log.d(TAG, arr.get(i).toString());
//            arr.set(i,0.0f);

        }
    }

}

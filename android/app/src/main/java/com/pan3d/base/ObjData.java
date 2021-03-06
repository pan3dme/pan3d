package com.pan3d.base;

import com.pan3d.engine.ResCount;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Matrix3D;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.ShortBuffer;
import java.util.ArrayList;
import java.util.List;


public class ObjData extends ResCount {
    private static final String TAG = "ObjData";
    public List<Float> verticeslist;
    public List<Float> uvlist;
    public List<Short> indexs;
    public List<Float> lightuvs;
    public List<Float> normals;
    public List<Float> tangents;
    public List<Float> bitangents;
    /**顶点 uv lightuv normal 合成一个 va */
    public boolean compressBuffer;
    public int uvsOffsets;
    public int lightuvsOffsets;
    public int normalsOffsets;
    public int tangentsOffsets;
    public int bitangentsOffsets;
    public int stride;
    public boolean isCompile;
    public FloatBuffer vertexBuffer;
    public FloatBuffer uvBuffer;
    public ShortBuffer indexBuffer;
    public FloatBuffer  lightUvBuffer;
    public FloatBuffer  normalsBuffer;
    public FloatBuffer  tangentBuffer;
    public FloatBuffer  bitangentBuffer;

    public List<Matrix3D> invertAry;
    public int treNum ;

   public  ObjData(Scene3D val){
       super(val);
   }
    public void makeTriModel(){
        this.verticeslist=new ArrayList<Float>();//结果顶点坐标列表
        this.verticeslist.add(-1f);
        this.verticeslist.add(0f);
        this.verticeslist.add(0f);

        this.verticeslist.add(3f);
        this.verticeslist.add(0f);
        this.verticeslist.add(0f);

        this.verticeslist.add(3f);
        this.verticeslist.add(5f);
        this.verticeslist.add(0f);

        this.verticeslist.add(-1f);
        this.verticeslist.add(4f);
        this.verticeslist.add(0f);

        this.verticeslist.add(-1f);
        this.verticeslist.add(0f);
        this.verticeslist.add(0f);


        this.indexs=new ArrayList<Short>();//结果顶点坐标列表
        this.indexs.add((short)0);
        this.indexs.add((short)1);
        this.indexs.add((short)2);

        this.upToGup();

    }
    public void  upToGup()
    {
        scene3D.objDataManager.addWaitArrByObjData(this);
    }
    public void  upToGupCopy(){
        if(!this.isCompile){
            this.vertexBuffer= ObjData.upGpuvertexBuffer(this.verticeslist);
            if(this.uvlist!=null&&this.uvlist.size()>0){
                this.uvBuffer= ObjData.upGpuvertexBuffer(this.uvlist);
            }
            if(this.lightuvs!=null&&this.lightuvs.size()>0){
                this.lightUvBuffer= ObjData.upGpuvertexBuffer(this.lightuvs);
            }
            if(this.normals!=null&&this.normals.size()>0){
                this.normalsBuffer= ObjData.upGpuvertexBuffer(this.normals);
            }

            this.indexBuffer= ObjData.upGpuIndexBuffer(this.indexs);
            this.treNum= this.indexs.size();
            this.isCompile=true;
        }
    }

    public static  ShortBuffer upGpuIndexBuffer(List<Short> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*2);
        buffer.order(ByteOrder.nativeOrder());
        ShortBuffer verBuff=buffer.asShortBuffer();
        for (int i=0;i<size;i++){
            verBuff.put(data.get(i));
        }
        verBuff.position(0);
        return verBuff;
    }
    public static   FloatBuffer upGpuvertexBuffer(List<Float> data){
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
    public static   List<Float> getListFoatByArr(Float[] data){
        List<Float> arr=new ArrayList<>();
        for(int i=0;i<data.length;i++){
            arr.add(data[i]);
        }
        return  arr;
    }
    public static   List<Short> getListShortByArr(int[] data){
        List<Short> arr=new ArrayList<>();
        for(int i=0;i<data.length;i++){
           arr.add((short)data[i]);
        }
        return  arr;
    }


}

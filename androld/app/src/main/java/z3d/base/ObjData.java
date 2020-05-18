package z3d.base;


import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.ShortBuffer;
import java.util.ArrayList;
import java.util.List;

import z3d.engine.ResCount;




public class ObjData extends ResCount {

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
    public boolean hasdispose;
    public boolean isCompile;


    public FloatBuffer vertexBuffer;
    public FloatBuffer uvBuffer;
    public ShortBuffer indexBuffer;
    public FloatBuffer  lightUvBuffer;
    public FloatBuffer  normalsBuffer;
    public FloatBuffer  tangentBuffer;
    public FloatBuffer  bitangentBuffer;
    public int treNum ;


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
        if(!this.isCompile){
            this.vertexBuffer=this.upGpuvertexBufferbbb(this.verticeslist);
            if(this.normals!=null&&this.normals.size()>0){
                this.normalsBuffer=this.upGpuvertexBufferbbb(this.normals);
            }
            this.indexBuffer=this.upGpuIndexBuffercopy(this.indexs);
            this.treNum= this.indexs.size();
            this.isCompile=true;
        }


    }
/*
short Indexbuff
 */
    public  ShortBuffer upGpuIndexBuffercopy(List<Short> data){
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
    /*
    float vertexBuff
     */
    public  FloatBuffer upGpuvertexBufferbbb(List<Float> data){
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

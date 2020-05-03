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
    public List<Integer> indexs;
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


    public FloatBuffer vertexBuffer;
    public FloatBuffer uvBuffer;
    public ShortBuffer indexBuffer;
    public FloatBuffer  lightUvBuffer;
    public FloatBuffer  normalsBuffer;
    public FloatBuffer  tangentBuffer;
    public FloatBuffer  bitangentBuffer;
    public int treNum ;


    public void makeTriModel(){


        ArrayList<Float> alvResult=new ArrayList<Float>();//结果顶点坐标列表
        alvResult.add(-1f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(3f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(3f);
        alvResult.add(5f);
        alvResult.add(0f);

        alvResult.add(-1f);
        alvResult.add(4f);
        alvResult.add(0f);


        alvResult.add(-1f);
        alvResult.add(0f);
        alvResult.add(0f);



        setVert(alvResult);


        this.makeIndex();


    }
    private void makeIndex()
    {
        final short index[]={
                0,1,2,0,2,3
        };
        ByteBuffer cc= ByteBuffer.allocateDirect(index.length*2);
        cc.order(ByteOrder.nativeOrder());
        this.indexBuffer=cc.asShortBuffer();
        this.indexBuffer.put(index);
        this.indexBuffer.position(0);


        this.treNum=index.length;

    }
    private void setVert(ArrayList<Float> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*4);
        buffer.order(ByteOrder.nativeOrder());
        this.vertexBuffer=buffer.asFloatBuffer();
        for (int i=0;i<size;i++){
            this.vertexBuffer.put(data.get(i));
        }
        this.vertexBuffer.position(0);

    }

}

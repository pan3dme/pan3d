package z3d.base;


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



}

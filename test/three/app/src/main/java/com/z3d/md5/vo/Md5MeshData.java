package com.z3d.md5.vo;

import java.util.HashMap;
import java.util.List;

import com.z3d.base.MeshData;

public class Md5MeshData extends MeshData {

    public HashMap<String,List> mesh  ;
    public List<ObjectTri> triItem;
    public List<ObjectWeight>  weightItem;
    public List<ObjectUv>  uvItem;
    public List<ObjectBone>  boneItem;
    public int faceNum;

}

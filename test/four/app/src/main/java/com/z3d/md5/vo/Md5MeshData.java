package com.z3d.md5.vo;

import com.z3d.base.MeshData;
import com.z3d.scene.Scene3D;

import java.util.HashMap;
import java.util.List;

public class Md5MeshData extends MeshData {

    public HashMap<String,List> mesh  ;
    public List<ObjectTri> triItem;
    public List<ObjectWeight>  weightItem;
    public List<ObjectUv>  uvItem;
    public List<ObjectBone>  boneItem;
    public int faceNum;

    public Md5MeshData(Scene3D val) {
        super(val);
    }
}

package com.z3d.md5.vo;

public class ObjectWeight {

    public float x=0;
    public float y= 0;
    public float z=0;
    public float w= 0;
    public float weight= 0;
    public Integer boneId=0;
    public int id=0;

    public ObjectWeight clone() {
        ObjectWeight obj = new ObjectWeight();
        obj.x = this.x;
        obj.y = this.y;
        obj.z = this.z;
        obj.w = this.w;
        obj.weight = this.weight;
        obj.boneId = this.boneId;
        obj.id = this.id;
        return obj;
    }
}

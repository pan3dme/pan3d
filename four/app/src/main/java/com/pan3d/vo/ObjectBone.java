package com.pan3d.vo;

public class ObjectBone extends ObjectBaseBone {


    public int changtype;
    public int startIndex;
    public Matrix3D matrix;
    public ObjectBone clone()
    {
        ObjectBone newBone = new ObjectBone();
        newBone.tx = this.tx;
        newBone.ty = this.ty;
        newBone.tz = this.tz;
//        newBone.tw = this.tw;
        newBone.qx = this.qx;
        newBone.qy = this.qy;
        newBone.qz = this.qz;
        newBone.qw = this.qw;
        newBone.changtype = this.changtype;
        newBone.name = this.name;
        newBone.father = this.father;
        newBone.startIndex = this.startIndex;
        newBone.matrix = this.matrix;
        return newBone;
    }
}

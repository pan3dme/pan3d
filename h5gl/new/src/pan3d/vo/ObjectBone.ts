module Pan3d {
export  class ObjectBone extends ObjectBaseBone {
    public changtype: number;
    public startIndex: number;
    public matrix: Matrix3D;
    public clone(): ObjectBone {
        var newBone: ObjectBone = new ObjectBone;

        newBone.tx = this.tx;
        newBone.ty = this.ty;
        newBone.tz = this.tz;
        newBone.tw = this.tw;
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
}
package z3d.material;

import java.util.List;

import z3d.vo.Float32Array;
import z3d.vo.Vector3D;

public class ConstItem {

    private int  _id;
    public String  name;
    public Vector3D value ;
    public Float32Array vecNum;

    public  String paramName0;
    public int  param0Type;
    public int  param0Index;

    public  String paramName1;
    public int  param1Type;
    public int  param1Index;

    public  String paramName2;
    public int  param2Type;
    public  int param2Index;

    public  String paramName3;
    public int  param3Type;
    public int  param3Index;

    public boolean isDynamic;

    public int  offset ;

    public void set_id(int _id) {
        this._id = _id;
    }

    public void creat(Float32Array $vc) {
        this.vecNum = $vc;
        this.vecNum.put(0 + this.offset,this.value.x);
        this.vecNum.put(1 + this.offset,this.value.y);
        this.vecNum.put(2 + this.offset,this.value.z);
        this.vecNum.put(3 + this.offset,this.value.w);
    }
}

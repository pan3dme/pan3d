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

    public void setDynamicOffset(DynamicBaseConstItem $dynamic) {
        if (this.paramName0 == $dynamic.paramName) {
            $dynamic.targetOffset = this.param0Index + this.offset;
        } else if (this.paramName1 == $dynamic.paramName) {
            $dynamic.targetOffset = this.param1Index + this.offset;
        } else if (this.paramName2 == $dynamic.paramName) {
            $dynamic.targetOffset = this.param2Index + this.offset;
        } else if (this.paramName3 == $dynamic.paramName) {
            $dynamic.targetOffset = this.param3Index + this.offset;
        }
    }

    public void setDynamic(DynamicBaseConstItem dynamic) {

        for(int i=0;i<dynamic.currentValue.size();i++){
            this.vecNum.put(dynamic.targetOffset+i,dynamic.currentValue.get(i));
        }
    }
}

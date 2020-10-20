package z3d.material;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import z3d.base.Scene_data;
import z3d.vo.CurveItemVo;
import z3d.vo.CurveVo;

public class Curve {

    public  int type;
    public  int begintFrame;
    public  int maxFrame;
    public List<List<Float>> valueVec;
    public List<Float> valueV3d;

    public  Curve(){
        valueV3d=new ArrayList<>();
        valueV3d.add(1.0f);
        valueV3d.add(1.0f);
        valueV3d.add(1.0f);
        valueV3d.add(1.0f);

    }
    public List<Float> getValue(float t) {
        if (this.valueVec==null || this.begintFrame == -1) {
            return this.valueV3d;
        }
        int flag =  float2int(t / Scene_data.frameTime - this.begintFrame);
        if (flag < 0) {
            flag = 0;
        } else if (flag > this.maxFrame - this.begintFrame) {
            flag = this.maxFrame - this.begintFrame;
        }
        return this.valueVec.get(flag);
    }
    private  int float2int(float val){

        return  (int )val;
    }

    public void setData(CurveVo obj) {

        this.type = obj.type;
        this.maxFrame = obj.maxFrame;
        if (obj.items.size()>0) {
            CurveItemVo curveItemVo=(CurveItemVo) obj.items.get(0);
            this.begintFrame = curveItemVo.frame;
        } else {
            this.begintFrame = -1;
        }
        int len = obj.values.get(0).size();
        List<List<Float>> ary= new ArrayList<>();
        for (int i = 0; i < len; i++) {
            List<Float> itemAry  = new ArrayList<>();
            if (this.type == 1) {
                itemAry.add(obj.values.get(0).get(i));
            } else if (this.type == 2) {
                itemAry.add(obj.values.get(0).get(i));
                itemAry.add(obj.values.get(1).get(i));
            } else if (this.type == 3) {
                itemAry.add(obj.values.get(0).get(i));
                itemAry.add(obj.values.get(1).get(i));
                itemAry.add(obj.values.get(2).get(i));
            } else if (this.type == 4) {
                Float w = obj.values.get(3).get(i);
                itemAry.add(obj.values.get(0).get(i)*w);
                itemAry.add(obj.values.get(1).get(i)*w);
                itemAry.add(obj.values.get(2).get(i)*w);
                itemAry.add(w);
            }
            ary.add(itemAry);
        }
        this.valueVec = ary;


    }
}

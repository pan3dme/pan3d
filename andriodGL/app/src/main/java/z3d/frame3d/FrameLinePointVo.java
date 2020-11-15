package z3d.frame3d;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

import z3d.base.Object3D;

public class FrameLinePointVo extends Object3D {
    public float time;
    public int id;
    public boolean iskeyFrame;
    public boolean isAnimation;
    public Object data;

    public static int maxTime = 0;

    public void writeObject(JSONObject $obj) {

        try {

            this.time = $obj.getInt("time");
//            this.id = $obj.get("id")!=null?(int) $obj.get("id"):0;
            this.iskeyFrame = $obj.getBoolean("iskeyFrame");
            this.isAnimation = $obj.getBoolean("isAnimation");


            this.x = $obj.getLong("x") / 10;
            this.y =  $obj.getLong("y")  / 10;
            this.z = $obj.getLong("z")  / 10;

            this.scaleX =  $obj.getLong("scaleX") / 10;
            this.scaleY =  $obj.getLong("scaleY")  / 10;
            this.scaleZ =  $obj.getLong("scaleZ")  / 10;

            this.rotationX =  $obj.getLong("rotationX") ;
            this.rotationY =  $obj.getLong("rotationY") ;
            this.rotationZ = $obj.getLong("rotationZ") ;

            this.data = $obj.get("data");


            FrameLinePointVo.maxTime = Math.max((int)this.time, FrameLinePointVo.maxTime);

        } catch (Exception e) {
            e.printStackTrace();
        }




    }
}

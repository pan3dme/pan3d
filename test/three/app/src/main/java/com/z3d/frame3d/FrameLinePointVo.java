package com.z3d.frame3d;

import org.json.JSONObject;

import com.z3d.base.Object3D;

public class FrameLinePointVo extends Object3D {
    public float time;
    public int id;
    public boolean iskeyFrame;
    public boolean isAnimation;
    public Object data;


    public void writeObject(JSONObject $obj) {

        try {

            this.time = $obj.getInt("time");
//            this.id = $obj.get("id")!=null?(int) $obj.get("id"):0;
            this.iskeyFrame = $obj.getBoolean("iskeyFrame");
            this.isAnimation = $obj.getBoolean("isAnimation");


            this.x =  (float) $obj.getDouble("x") / 10;
            this.y =  (float)  $obj.getDouble("y")  / 10;
            this.z =  (float) $obj.getDouble("z")  / 10;

            this.scaleX = (float) $obj.getDouble("scaleX") / 10;
            this.scaleY =  (float)  $obj.getDouble("scaleY")  / 10;
            this.scaleZ =  (float)  $obj.getDouble("scaleZ")  / 10;

            this.rotationX =   (float) $obj.getDouble("rotationX") ;
            this.rotationY =  (float) $obj.getDouble("rotationY") ;
            this.rotationZ =  (float) $obj.getDouble("rotationZ") ;

            this.data = $obj.get("data");


           

        } catch (Exception e) {
            e.printStackTrace();
        }




    }
}

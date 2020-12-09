package com.z3d.display.particle.ctrl;

import java.util.List;

public class SelfRotation extends BaseAnim {

    public void dataByte(List  va, List arr) {
//        this.beginTime =(float) arr.get(0);
//        float indx001=(float)  arr.get(1);
//        if (indx001== -1) {
//            this.lastTime = Scene_data.MAX_NUMBER;
//        } else {
//            this.lastTime =indx001;
//        }
        super.dataByte(va,arr);
        this.speed =(float)arr.get(2) * 0.1f;
        this.aSpeed =(float)arr.get(3) * 0.1f;
    }
}

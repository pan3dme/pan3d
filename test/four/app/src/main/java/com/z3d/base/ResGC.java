package com.z3d.base;

import com.z3d.scene.Scene3D;

import java.util.HashMap;

public class ResGC {

    public HashMap dic;
    public Scene3D scene3D;

    public ResGC( Scene3D val) {
         scene3D = val;
        this.dic=new HashMap();

    }
//    public void clearAll(){
//        this.dic=new HashMap();
//    }
}

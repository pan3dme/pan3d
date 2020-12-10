package com.z3d.material;

import android.graphics.Bitmap;

import com.z3d.engine.ResCount;
import com.z3d.scene.Scene3D;

public class TextureRes extends ResCount {
    public int textTureInt;
    public Bitmap bitmap;
    public TextureRes(Scene3D val){
        super(val);
    }
}

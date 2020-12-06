package com.z3d.units;

import android.graphics.Bitmap;
import android.graphics.Color;

import java.util.List;

public class ColorTransition {
    public static Bitmap getImageDataByVec(List<Float> imgNumVec, float life) {
        Bitmap bitmap = Bitmap.createBitmap(128, 2,
                Bitmap.Config.ARGB_8888);
        int length   =imgNumVec.size()/4;
        for(float i=0;i<bitmap.getWidth();i++){
            int idx=(int)(i/(float) bitmap.getWidth()*length);
            int drawColor;
            drawColor=   Color.argb(imgNumVec.get(idx*4+0),imgNumVec.get(idx*4+1),imgNumVec.get(idx*4+2),imgNumVec.get(idx*4+3));
//            drawColor=   Color.argb( 1.0f,1.0f,1.0f,1.0f);
            bitmap.setPixel((int)i,0,drawColor);
            bitmap.setPixel((int)i,1,drawColor);
        }
        return bitmap;

    }
}

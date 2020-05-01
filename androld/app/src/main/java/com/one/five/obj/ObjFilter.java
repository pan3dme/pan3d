package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;


/**
 * Created by wuwang on 2017/1/8
 */

public class ObjFilter extends BaseDisplaySprite {




    public ObjFilter(Resources mRes) {
        super(mRes);
    }



    @Override
    protected void onCreate() {



        createProgram (null,null);




    }






}

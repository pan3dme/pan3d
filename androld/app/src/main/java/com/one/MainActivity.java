package com.one;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ConfigurationInfo;
import android.opengl.GLDebugHelper;
import android.opengl.GLSurfaceView;
import android.opengl.GLU;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


import java.io.InputStream;
import javax.microedition.khronos.egl.EGL10;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.egl.EGLContext;
import javax.microedition.khronos.egl.EGLDisplay;
import javax.microedition.khronos.egl.EGLSurface;
import javax.microedition.khronos.opengles.GL10;

import z3d.res.SceneRes;
import z3d.vo.Matrix3D;


import java.nio.ByteOrder;
import java.nio.IntBuffer;
import java.util.Timer;
import java.util.TimerTask;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import android.app.Activity;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import com.one.sprte.MyGLSurfaceView;


public class MainActivity extends AppCompatActivity {

    private Button subMitBut;
    private boolean doColorful = false;
    private BoxSprite3D boxSprite3D;
    private Timer mTimer1;
    private TimerTask mTask1;
    public static final String COLOR_OPTION_EXTRA = "COLORFUL";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        int type=2;
        switch (type)
        {
            case 0:
                setContentView(R.layout.activity_main);
                subMitBut=(Button)findViewById(R.id.loadBut);
                subMitBut.setOnClickListener(new MyClickListener());
                break;
            case 1:

                setContentView( new BaseSurfaceView(this));
                break;
            case 2:

                setContentView(new MyGLSurfaceView(this));
                break;

            case 3:


                break;


            default:
                break;
        }



    }



    public class MyClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {

            /*
            Intent intent=new Intent(MainActivity.this,ImageViewActivity.class);
            startActivity(intent);
            */

            SceneRes sceneRes = new SceneRes();

            try {


                InputStream in = getResources().openRawResource(R.raw.file2012);
                //获取文件的字节数
                int lenght = in.available();
                //创建byte数组byte[]  buffer = new byte[lenght];
                byte[] buffer = new byte[lenght];
                //将文件中的数据读到byte数组中
                in.read(buffer);
                sceneRes.loadComplete(buffer);


            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}

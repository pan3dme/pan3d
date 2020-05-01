package com.one;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;



import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

import com.one.five.obj.ObjLoadActivity;
import com.one.four.FGLRender;
import com.one.four.FGLView;
import com.one.two.OpenGLRender;

import java.io.InputStream;

import z3d.base.CallBackFun;
import z3d.res.SceneRes;

public class MainActivity extends Activity {
    GLSurfaceView glSurfaceView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        int tabId=0;


        switch (tabId)
        {
            case 0:
                SceneRes sceneRes = new SceneRes();

                try {


                    InputStream in = getResources().openRawResource(R.raw.file2012);
                    //获取文件的字节数
                    int lenght = in.available();
                    //创建byte数组byte[]  buffer = new byte[lenght];
                    byte[] buffer = new byte[lenght];
                    //将文件中的数据读到byte数组中
                    in.read(buffer);


                    sceneRes.loadComplete(buffer ,new CallBackFun() {
                        @Override
                        public void StateChange(boolean State) {

                            Log.d("加载结算", "StateChange: ");





                        }
                    });


                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case 1:
                GLSurfaceView glSurfaceView = new GLSurfaceView(this);
                glSurfaceView.setRenderer(new OpenGLRender());
                setContentView(glSurfaceView);


                break;
            case 2:


                FGLView  dd= new FGLView(this);


                break;
            case 3:
                break;
            default:
                break;
        }


       // startActivity(new Intent(this, ObjLoadActivity.class));

    }


    @Override
    protected void onResume() {
        super.onResume();

    }
    @Override
    protected void onPause() {
        super.onPause();

    }




}
package com.one;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;



import java.io.InputStream;

import z3d.res.SceneRes;


public class MainActivity extends AppCompatActivity {

    private Button subMitBut;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        subMitBut=(Button)findViewById(R.id.loadBut);

        subMitBut.setOnClickListener(new MyClickListener());




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

package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;


import android.widget.ImageView;

import com.bumptech.glide.Glide;

import java.io.InputStream;


import z3d.base.ByteArray;


public class ImageViewActivity extends AppCompatActivity {
    private Button loadBut;
    private ImageView tittleImageView;
    private String downloadUrl;// 下载链接地址
    private int threadNum;// 开启的线程数
    private String filePath;// 保存文件路径地址
    private int blockSize;// 每一个线程的下载量
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_view);

        this.downloadUrl = "http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/1.txt";
        this.threadNum = 1;
        this.filePath = "DD.txt";


        loadBut=(Button)findViewById(R.id.loadBut);

        loadBut.setOnClickListener(new ImageViewActivity.MyClickListener());

        tittleImageView=(ImageView)findViewById(R.id.tittleImageView);
    //    Glide.with(this).load("http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/cube/e01.jpg").into(tittleImageView);

      Glide.with(this).load("https://www.baidu.com/img/bd_logo1.png").into(tittleImageView);


        ///Users/zhao/AndroidStudioProjects/MyApplication4/app/src/main/res/raw

    }
    public class MyClickListener implements View.OnClickListener{
        @Override
        public void onClick(View v) {
            try {
                InputStream in = getResources().openRawResource(R.raw.file2012);
                //获取文件的字节数
                int lenght = in.available();
                //创建byte数组
                byte[]  buffer = new byte[lenght];
                //将文件中的数据读到byte数组中
                in.read(buffer);

                readSceneByBuff(buffer);


            } catch (Exception e) {
                e.printStackTrace();
            }


        }
    }
    public void readSceneByBuff(byte[] buff ) {




        ByteArray kbayte=   new ByteArray(buff);
        int version=   kbayte.readInt();

        Log.d("version-   ->",  version+" " );

    }



}

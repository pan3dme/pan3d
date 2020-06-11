package com.e.temp001;

import androidx.appcompat.app.AppCompatActivity;


import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;


import com.e.temp001.FileUtils.CallBackUtil;
import com.e.temp001.FileUtils.FileUtilsCopy;
import com.e.temp001.FileUtils.UrlHttpUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;



public class MainActivity extends AppCompatActivity {

    private  String TAG="AAA";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Context ctx= getApplicationContext() ;
        MainActivity. savePath =ctx.getFilesDir().getPath();
      //  MainActivity. downLoad("https://pic-bucket.ws.126.net/photo/0001/2020-06-11/FERKPMQI00AO0001NOS.jpg", "che.png");
        this.loadBase();
    }
    public  void  loadBase()
    {
        String url="https://pic-bucket.ws.126.net/photo/0001/2020-06-11/FERKPMQI00AO0001NOS.jpg";
        UrlHttpUtil.downloadFile(url, new CallBackUtil.CallBackFile(MainActivity. savePath,"fileName.jpg") {
            @Override
            public void onFailure(int code, String errorMessage) {

            }

            @Override
            public void onProgress(float progress, long total) {
                super.onProgress(progress, total);
                Log.d(TAG, "onResponse: ");
            }

            @Override
            public void onResponse(File response) {
                Log.d(TAG, "onResponse: ");
            }
        });

    }
    public static String savePath;
    public static void downLoad(final String path, final String filename) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {

                    URL url = new URL(path);
                    HttpURLConnection con = (HttpURLConnection) url.openConnection();
                    con.setReadTimeout(5000);
                    con.setConnectTimeout(5000);
                    con.setRequestProperty("Charset", "UTF-8");
                    con.setRequestMethod("GET");
                    if (con.getResponseCode() == 200) {
                        InputStream is = con.getInputStream();//获取输入流
                        FileOutputStream fileOutputStream = null;//文件输出流
                        if (is != null) {
                            FileUtilsCopy fileUtils = new FileUtilsCopy();

                            File aaa=fileUtils.createFile(filename);
                            if(!aaa.getParentFile().exists()){
                                aaa.getParentFile().mkdirs();
                            }

                            fileOutputStream = new FileOutputStream(aaa,true);//指定文件保存路径，代码看下一步
                            byte[] buf = new byte[1024];
                            int ch;
                            while ((ch = is.read(buf)) != -1) {
                                fileOutputStream.write(buf, 0, ch);//将获取到的流写入文件中
                            }
                        }
                        if (fileOutputStream != null) {
                            fileOutputStream.flush();
                            fileOutputStream.close();
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }


}
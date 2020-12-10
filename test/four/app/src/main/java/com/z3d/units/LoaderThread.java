package com.z3d.units;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;
import com.z3d.base.ByteArray;
import com.z3d.base.Scene_data;
import com.z3d.scene.Scene3D;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;


public class LoaderThread
{
    public boolean idle;
    public int id;
    public  LoadInfo loadInfo;

    public Scene3D scene3D;
    public  static Context fileContext;
    public LoaderThread(Scene3D val, int id)
    {
        scene3D=val;
        this.id=id;
        this.idle = true;
        final LoaderThread that=this;
//        this.thread=new Thread(new Runnable(){
//            @Override
//            public void run() {
//                that. run();
//            }
//        });

    }
    public  void  load(LoadInfo value)
    {
        this.idle = false;
        this.loadInfo=value;
//        this.thread.start();
        this.run();

    }
    private void run(){

        if(this.loadInfo.type== LoadManager.IMG_TYPE){

            UrlHttpUtil.getBitmap(Scene_data.fileRoot+this.loadInfo.url, new CallBackUtil.CallBackBitmap() {
                @Override
                public void onFailure(int code, String errorMessage) {
                    Log.d("errorMessage", "onResponse: ");
                }
                @Override
                public void onResponse(Bitmap bm) {
                    loadImg(bm);
                }
            });
        }else{
            final LoaderThread that=this;
            String localUrl=   this.loadInfo.url.replace(Scene_data.fileRoot,"");
            localUrl=    localUrl.replace("/","_");
            String savePath = LoaderThread.fileContext.getFilesDir().getPath();
            UrlHttpUtil.downloadFile(this.loadInfo.url, new CallBackUtil.CallBackFile(savePath,localUrl) {
                @Override
                public void onFailure(int code, String errorMessage) {
                    Log.d("errorMessage", "onResponse: ");
                }
                @Override
                public void onProgress(float progress, long total) {
                    Log.d("progress"+progress, "total: "+total);
                    super.onProgress(progress, total);
                }
                @Override
                public void onResponse(File response) {
                    Log.d("TAG", "onResponse: ");
                    that.onResponse(response);
                }
            });
        }

    }

    private Bitmap loagImageByUrl(String url) {
        Bitmap bm = null;
        try {
            URL iconUrl = new URL(url);
            URLConnection conn = iconUrl.openConnection();
            HttpURLConnection http = (HttpURLConnection) conn;
            int length = http.getContentLength();
            conn.connect();
            // 获得图像的字符流
            InputStream is = conn.getInputStream();
            BufferedInputStream bis = new BufferedInputStream(is, length);
            bm = BitmapFactory.decodeStream(bis);
            bis.close();
            is.close();// 关闭流
            loadImg(bm);


        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return bm;
    }
    private void  onResponse(File file)
    {

        if( this.loadInfo.type== LoadManager.BYTE_TYPE){
            try {
                InputStream in =new FileInputStream(file);
                int lenght = in.available();
                //创建byte数组byte[]  buffer = new byte[lenght];
                byte[] buffer = new byte[lenght];
                //将文件中的数据读到byte数组中
                in.read(buffer);
                this.loadByte(new ByteArray(buffer));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else  if( this.loadInfo.type== LoadManager.IMG_TYPE){

            try {
                Bitmap bitmap = BitmapFactory.decodeStream(new FileInputStream(file)); //根据流数据 创建一个bitmap对象
                this.loadImg(bitmap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else  if( this.loadInfo.type== LoadManager.XML_TYPE){

            try {
                BufferedReader buffreader = new BufferedReader( new InputStreamReader(new FileInputStream(file)));
                String line;
                //分行读取
                String content = "";
                while (( line = buffreader.readLine()) != null) {
                    content += line + "\n";
                }

                loadXml(content);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }




    }

    private void  loadByte(ByteArray value)
    {
        HashMap dic=new HashMap();
        try {
            dic.put("byte",value);
            dic.put("info",this.loadInfo.info);
            this.loadInfo.fun.bfun(dic);
        } catch (Exception e) {
            e.printStackTrace();
            this.loadInfo.fun.bfun(null);
        }
        this.idle = true;
        this.loadInfo = null;
        scene3D.loadManager.loadWaitList();

    }
    private void  loadImg(Bitmap bmp)
    {

        HashMap dic=new HashMap();
        dic.put("bitmap",bmp);
        dic.put("info",this.loadInfo.info);
        this.loadInfo.fun.bfun(dic);
        this.idle = true;
        this.loadInfo = null;

        scene3D.loadManager.loadWaitList();
    }
    private void  loadXml(String str)
    {

        HashMap dic=new HashMap();
        dic.put("txt",str);
        dic.put("info",this.loadInfo.info);
        this.loadInfo.fun.bfun(dic);
        this.idle = true;
        this.loadInfo = null;

       scene3D.loadManager.loadWaitList();
    }



}

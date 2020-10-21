package z3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Log;

import android.content.Context;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;

import java.io.InputStream;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;

import urlhttp.CallBackUtil;
import urlhttp.UrlHttpUtil;
import z3d.base.ByteArray;

import z3d.base.Scene_data;
import z3d.base.TexTuresBackFun;
import z3d.filemodel.TextureManager;
import z3d.material.TextureRes;


public class LoaderThread
{
    public boolean idle;
    public int id;
    public  LoadInfo loadInfo;



    private  Thread thread;
    public  static Context fileContext;
    public LoaderThread(int val)
    {
        this.id=val;
        this.idle = true;
        final LoaderThread that=this;
        this.thread=new Thread(new Runnable(){
            @Override
            public void run() {
                that. run();
            }
        });

    }
    public  void  load(LoadInfo value)
    {
        this.idle = false;
        this.loadInfo=value;
        this.thread.start();

    }
    private void run(){

        if(this.loadInfo.type==LoadManager.IMG_TYPE){
            loagImageByUrl(this.loadInfo.url);
        }else{
            final   LoaderThread that=this;
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

        if( this.loadInfo.type==LoadManager.BYTE_TYPE){
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
        }else  if( this.loadInfo.type==LoadManager.IMG_TYPE){

            try {
                Bitmap bitmap = BitmapFactory.decodeStream(new FileInputStream(file)); //根据流数据 创建一个bitmap对象
                this.loadImg(bitmap);
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
        LoadManager.getInstance().loadWaitList();

    }
    private void  loadImg(Bitmap bmp)
    {

        HashMap dic=new HashMap();
        dic.put("bitmap",bmp);
        dic.put("info",this.loadInfo.info);
        this.loadInfo.fun.bfun(dic);
        this.idle = true;
        this.loadInfo = null;

        LoadManager.getInstance().loadWaitList();
    }



}

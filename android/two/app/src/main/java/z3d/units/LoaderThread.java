package z3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Log;

import android.content.Context;

import java.io.File;
import java.io.FileInputStream;

import java.io.InputStream;

import java.util.HashMap;

import urlhttp.CallBackUtil;
import urlhttp.UrlHttpUtil;
import z3d.base.ByteArray;

import z3d.base.Scene_data;
import z3d.display.role.Display3dMovieShader;
import z3d.program.ProgrmaManager;


public class LoaderThread
{
    public boolean idle;
    public int id;
    public  LoadInfo loadInfo;
    private String localUrl;

    public  static Context fileContext;
    public LoaderThread(int val)
    {
        this.id=val;
        this.idle = true;

    }
    public  void  load(LoadInfo value)
    {
        this.idle = false;
        this.loadInfo=value;
        this. localUrl=  this.loadInfo.url.replace(Scene_data.fileRoot,"");
        this. localUrl=   this. localUrl.replace("/","_");
        String savePath = LoaderThread.fileContext.getFilesDir().getPath();
        final   LoaderThread that=this;
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

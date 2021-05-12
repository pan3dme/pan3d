package com.pan3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.ImageView;

import com.pan3d.base.Scene_data;
import com.pan3d.scene.Scene3D;
import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class LoadManager {

    public static String  BYTE_TYPE="BYTE_TYPE";
    public static String  IMG_TYPE="IMG_TYPE";
    public static String  XML_TYPE="XML_TYPE";


    public List<LoaderThread> loadThreadList;
    public List<LoadInfo> waitLoadList;
    public Scene3D scene3D;
    public LoadManager(Scene3D val)
    {
        scene3D=val;
        this.loadThreadList=new ArrayList<>();
        this.waitLoadList=new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            this.loadThreadList.add(new LoaderThread(scene3D, i));
        }
    }

    public void loadUrl(String url,String typestr,  LoadBackFun backFun, Object info)
    {
        LoadInfo loadInfo = new LoadInfo();
        loadInfo.url=url;
        loadInfo.type=typestr;
        loadInfo.fun=backFun;
        loadInfo.info=info;
        for (int i = 0; i < this.loadThreadList.size(); i++) {
            if (this.loadThreadList.get(i).idle) {
                this.loadThreadList.get(i).load(loadInfo);
                return;
            }
        }

        this.waitLoadList.add(loadInfo);


    }
    public void loadWaitList()
    {
        if (this.waitLoadList.size() <= 0) {
            return;
        }
        for (int i = 0; i < this.loadThreadList.size(); i++) {
            if (this.loadThreadList.get(i).idle) {
                this.loadThreadList.get(i).load(  this.waitLoadList.remove(this.waitLoadList.size()-1));
                return;
            }
        }

    }

    public static void loadXmlByUrl(String val,LoadBackFun backFun)
    {
        String savePath = LoaderThread.fileContext.getFilesDir().getPath();
        String url= Scene_data.fileRoot+val;
        String localUrl=   url.replace(Scene_data.fileRoot,"");
        localUrl=    localUrl.replace("/","_");

        UrlHttpUtil.downloadFile(url, new CallBackUtil.CallBackFile(savePath,localUrl) {
            @Override
            public void onFailure(int code, String errorMessage) {
                Log.d("errorMessage", "onResponse: ");
            }
            @Override
            public void onProgress(float progress, long total) {
//                    Log.d("progress"+progress, "total: "+total);
                super.onProgress(progress, total);
            }
            @Override
            public void onResponse(File file) {
                Log.d("TAG", "onResponse: ");
                try {
                    BufferedReader buffreader = new BufferedReader( new InputStreamReader(new FileInputStream(file)));
                    String line;
                    //分行读取
                    String content = "";
                    while (( line = buffreader.readLine()) != null) {
                        content += line + "\n";
                    }

                    Log.d("LoadManager", content);
                    HashMap dic=new HashMap();
                    dic.put("content",content);
                    backFun.bfun(dic);


                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }

    public static void loadBitmapByUrl(String val,LoadBackFun backFun)
    {
        String savePath = LoaderThread.fileContext.getFilesDir().getPath();

        String url;

        if(val.indexOf("http")==-1){
            url= Scene_data.fileRoot+val;
        }else{
            url=  val;
        }


        String localUrl=   url.replace(Scene_data.fileRoot,"");
        localUrl=    localUrl.replace("/","_");

        UrlHttpUtil.downloadFile(url, new CallBackUtil.CallBackFile(savePath,localUrl) {
            @Override
            public void onFailure(int code, String errorMessage) {
                Log.d("errorMessage", "onResponse: ");
            }
            @Override
            public void onProgress(float progress, long total) {
//                    Log.d("progress"+progress, "total: "+total);
                super.onProgress(progress, total);
            }
            @Override
            public void onResponse(File file) {
                Log.d("TAG", "onResponse: ");
                try {

                    Bitmap bitmap = BitmapFactory.decodeStream(new FileInputStream(file));
                    HashMap dic=new HashMap();
                    dic.put("bitmap",bitmap);
                    backFun.bfun(dic);


                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }
}

package z3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Log;

import android.content.Context;

import java.io.File;
import java.io.FileInputStream;

import java.io.InputStream;

import java.net.HttpURLConnection;

import java.net.URL;

import java.util.HashMap;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;


public class LoaderThread
{
    public boolean idle;
    public int id;
    public  LoadInfo loadInfo;

    private HttpUrlConnectionAsyncTask httpFilevotp;
    public  static Context fileContext;
    public LoaderThread(int val)
    {
        this.id=val;
        this.idle = true;
        this.httpFilevotp=new HttpUrlConnectionAsyncTask();
    }
    public  void  load(LoadInfo value)
    {
        this.idle = false;
        this.loadInfo=value;
        if(value.type==LoadManager.BYTE_TYPE){
            String savePath = LoaderThread.fileContext.getFilesDir().getPath();
            this.httpFilevotp.downloadFile(new CallBackFun() {
                @Override
                public void StateChange(boolean State) {
                    loadFinishByteUrl();
                }
            }, this.loadInfo.url, savePath + "/loadfile"+this.id);
            return;
        }
        HttpURLConnection conn = null;
        try {
            //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/role/yezhuz.txt
            URL mURL = new URL(this.loadInfo.url);
            conn = (HttpURLConnection) mURL.openConnection();
            conn.setRequestMethod("GET"); //设置请求方法
            // conn.setConnectTimeout(10000);设置连接服务器超时时间
            conn.setReadTimeout(5000); //设置读取数据超时时间
            conn.connect(); //开始连接
            int responseCode = conn.getResponseCode();
            //得到服务器的响应码
            if (responseCode == 200) { //访问成功
                InputStream in = conn.getInputStream(); //获得服务器返回的流数据
                if(value.type==LoadManager.IMG_TYPE){
                    Bitmap bitmap = BitmapFactory.decodeStream(in); //根据流数据 创建一个bitmap对象
                    this.loadImg(bitmap);
                }
            } else { //访问失败
                Log.d("lyf--", "访问失败===responseCode：" + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect(); //断开连接
            }
        }
    }

    private void  loadFinishByteUrl()
    {
        try {
            InputStream in =new FileInputStream(new File( this.httpFilevotp.filePath));
            int lenght = in.available();
            //创建byte数组byte[]  buffer = new byte[lenght];
            byte[] buffer = new byte[lenght];
            //将文件中的数据读到byte数组中
            in.read(buffer);
            this.loadByte(new ByteArray(buffer));
        } catch (Exception e) {
            e.printStackTrace();
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

package z3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import android.content.Context;
import com.one.R;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;

public class LoaderThread {

    public boolean idle;

    public  LoadInfo loadInfo;

    public  static Context fileContext;
    public LoaderThread()
    {
 
        this.idle = true;
    }
    public  void  load(LoadInfo value)
    {

        this.idle = false;
        this.loadInfo=value;

        if(value.type==LoadManager.BYTE_TYPE){
            String savePath6 = LoaderThread.fileContext.getFilesDir().getPath();
           this.writeUrToStrealm( new File(savePath6+"ccav.xtx")  ,this.loadInfo.url);
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
                if(value.type==LoadManager.BYTE_TYPE){
                 this.loadByte(in);

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
    private  void writeUrToStrealm(File uFile,String url) {
        try {
            URL uri = new URL(url);
            URLConnection connection = uri.openConnection();
            InputStream uristream = connection.getInputStream();
            //String cache = connection.getHeaderField("Ddbuild-Cache");
            String contentType = connection.getContentType();
            //textml; charset=utf-8
            String mimeType = "";
            String encoding = "";
            if (contentType != null && !"".equals(contentType)) {
                if (contentType.indexOf(";") != -1) {
                    String[] args = contentType.split(";");
                    mimeType = args[0];
                    String[] args2 = args[1].trim().split("=");
                    if (args.length == 2 && args2[0].trim().toLowerCase().equals("charset")) {
                        encoding = args2[1].trim();
                    } else {

                        encoding = "utf-8";
                    }
                } else {
                    mimeType = contentType;
                    encoding = "utf-8";
                }
            }

            //todo:缓存uristream
            FileOutputStream output = new FileOutputStream( uFile,true);;
            int read_len;
            byte[] buffer = new byte[1024];

            while ((read_len = uristream.read(buffer)) > 0) {
                output.write(buffer, 0, read_len);
            }
            output.close();
            uristream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void  loadByte(InputStream in)
    {
        HashMap dic=new HashMap();
        try {
            int lenght = in.available();
            byte[] buffer = new byte[lenght];
            in.read(buffer);
            dic.put("byte",new ByteArray(buffer));
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

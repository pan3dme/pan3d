package z3d.units;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

public class LoaderThread {

    public boolean idle;

    public  LoadInfo loadInfo;

    public LoaderThread()
    {

        this.idle = true;
    }
    public  void  load(LoadInfo value)
    {
        this.idle = false;
        this.loadInfo=value;
        HttpURLConnection conn = null;
        try {
            URL mURL = new URL(this.loadInfo.url);
            conn = (HttpURLConnection) mURL.openConnection();
            conn.setRequestMethod("GET"); //设置请求方法
            // conn.setConnectTimeout(10000);设置连接服务器超时时间
            conn.setReadTimeout(5000); //设置读取数据超时时间
            conn.connect(); //开始连接
            int responseCode = conn.getResponseCode();
            //得到服务器的响应码
            if (responseCode == 200) { //访问成功
                InputStream is = conn.getInputStream(); //获得服务器返回的流数据
                Bitmap bitmap = BitmapFactory.decodeStream(is); //根据流数据 创建一个bitmap对象

                this.loadImg(bitmap);

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

package z3d.filemodel;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.util.Log;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import z3d.base.ByteArray;
import z3d.base.ResGC;
import z3d.base.TexTuresBackFun;
import z3d.material.TextureRes;

public class TextureManager extends ResGC {


    public HashMap loadDic;
    public HashMap resDic;

    private static TextureManager _instance;
    public static TextureManager getInstance()  {
        if (TextureManager._instance==null) {
            TextureManager._instance = new TextureManager();
        }
        return TextureManager._instance;
    }
    public TextureManager()
    {
        this.loadDic=new HashMap();
        this.resDic=new HashMap();

    }

    public void  addRes(String url,Bitmap bitmap)
    {
        if( !this.dic.containsKey(url)&&!this.resDic.containsKey(url)){
            this.resDic.put(url,bitmap);
        }


        this.getImageFromNet("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/waterfall_01.png");
    }
    //-(void)getTexture:(NSString*)url fun:(void (^)(NSObject* any))fun wrapType:(int)wrapType info:(NSObject*)info filteType:(int)filteType mipmapType:(int)mipmapType;
    //{

    public void getTexture(String url , TexTuresBackFun bfun)
    {
//        "content/finalscens/mapscene/copy/ba卦tai/ba卦tai_hide/lightuv/build2.jpg" -> {Bitmap@12949} ""
//        "content/particleresources/textures/pattern/xingkong_bagua_01.png" -> {Bitmap@12951} ""
//        "content/particleresources/textures/halo/smallglow_00.jpg" -> {Bitmap@12953} ""
//        "content/particleresources/textures/pattern/xingkong_bagua.png" -> {Bitmap@12955} ""
//        "content/particleresources/textures/light_beam/ef_circle007.jpg" -> {Bitmap@12957} ""
//        "content/finalscens/mapscene/copy/ba卦tai/ba卦tai_hide/lightuv/build1.jpg" -> {Bitmap@12959} ""
//        "content/particleresources/textures/halo/jianguang.jpg" -> {Bitmap@12961} ""
//        "content/finalscens/mapscene/copy/ba卦tai/tietu/bgtai_fb_tiankong.jpg" -> {Bitmap@12963} ""
//        "content/finalscens/mapscene/copy/ba卦tai/tietu/ljfb_bagua.png" -> {Bitmap@12965} ""
//        "content/finalscens/mapscene/copy/ba卦tai/tietu/bgtai_fb_01.jpg" -> {Bitmap@12967} ""
        TextureRes textureRes;
        if( this.dic.containsKey(url)){
             textureRes=(TextureRes)this.dic.get(url);
             bfun.Bfun(textureRes);
             return;
        }
        if( this.resDic.containsKey(url)) {
            textureRes=new TextureRes();
            textureRes.textTureInt= this.createTexture((Bitmap) this.resDic.get(url));
            bfun.Bfun(textureRes);
            return;
        }

    }
    private int createTexture(Bitmap bitmap){
        int[] texture=new int[1];
        if(bitmap!=null&&!bitmap.isRecycled()){
            //生成纹理
            GLES20.glGenTextures(1,texture,0);
            //生成纹理
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,texture[0]);
            //设置缩小过滤为使用纹理中坐标最接近的一个像素的颜色作为需要绘制的像素颜色
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER,GLES20.GL_NEAREST);
            //设置放大过滤为使用纹理中坐标最接近的若干个颜色，通过加权平均算法得到需要绘制的像素颜色
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,GLES20.GL_TEXTURE_MAG_FILTER,GLES20.GL_LINEAR);
            //设置环绕方向S，截取纹理坐标到[1/2n,1-1/2n]。将导致永远不会与border融合
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_S,GLES20.GL_CLAMP_TO_EDGE);
            //设置环绕方向T，截取纹理坐标到[1/2n,1-1/2n]。将导致永远不会与border融合
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_T,GLES20.GL_CLAMP_TO_EDGE);
            //根据以上指定的参数，生成一个2D纹理
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, bitmap, 0);
            return texture[0];
        }
        return 0;
    }
    private Bitmap getImageFromNet(String url) {
        HttpURLConnection conn = null;
        try {
            URL mURL = new URL(url);
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
                return bitmap;
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
        return null;
    }




}

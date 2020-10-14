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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.ResGC;
import z3d.base.TexTuresBackFun;
import z3d.material.TextureRes;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;

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


       // this.getImageFromNet("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/waterfall_01.png");
    }

    public void getTexture(String url , TexTuresBackFun bfun)
    {

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
            this.dic.put(url,textureRes);
            return;
        }
        TextureLoad textureLoad=new TextureLoad();
        textureLoad.fun=bfun;
        textureLoad.url=url;
        List<TextureLoad> loadKeyArr;
        if(this.loadDic.containsKey(url)){
            loadKeyArr=(List<TextureLoad>) this.loadDic.get(url);
            loadKeyArr.add(textureLoad);
            return;
        }else{
            loadKeyArr=new ArrayList<>();
            loadKeyArr.add(textureLoad);
            this.loadDic.put(url,loadKeyArr);
        }
        LoadManager.getInstance().loadUrl(url,LoadManager.IMG_TYPE , new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                loadNetTextureCom((TextureLoad)  dic.get("info"),(Bitmap)  dic.get("bitmap"));
            }
        },textureLoad);


    }
    private  void  loadNetTextureCom(TextureLoad textureLoad,Bitmap bitmap)
    {
        TextureRes  textureRes=new TextureRes();
        textureRes.textTureInt= createTexture(bitmap);
        List<TextureLoad> arr=(List<TextureLoad>) this.loadDic.get(textureLoad.url);
        for (int i=0;i<arr.size();i++){
            arr.get(i).fun.Bfun(textureRes);
        }
        this.dic.put(textureLoad.url,textureRes);
        this.loadDic.remove(textureLoad.url);
    }
    public int createTexture(Bitmap bitmap){
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
             /*
            //设置环绕方向S，截取纹理坐标到[1/2n,1-1/2n]。将导致永远不会与border融合
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_S,GLES20.GL_CLAMP_TO_EDGE);
            //设置环绕方向T，截取纹理坐标到[1/2n,1-1/2n]。将导致永远不会与border融合
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_T,GLES20.GL_CLAMP_TO_EDGE);
            */
            //根据以上指定的参数，生成一个2D纹理
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, bitmap, 0);
            return texture[0];
        }
        return 0;
    }





}

package com.z3d.filemodel;

import android.graphics.Bitmap;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.transition.Scene;

import com.z3d.base.ResGC;
import com.z3d.base.TexTuresBackFun;
import com.z3d.material.TextureRes;
import com.z3d.scene.Scene3D;
import com.z3d.units.LoadBackFun;
import com.z3d.units.LoadManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class TextureManager extends ResGC {


    public HashMap loadDic;
    public HashMap resDic;



    public TextureManager(Scene3D val)
    {
        super(val);

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

            textureRes= this.createTexture((Bitmap) this.resDic.get(url));
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
        scene3D.loadManager.loadUrl(url, LoadManager.IMG_TYPE , new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                loadNetTextureCom((TextureLoad)  dic.get("info"),(Bitmap)  dic.get("bitmap"));
            }
        },textureLoad);


    }
    private  void  loadNetTextureCom(TextureLoad textureLoad,Bitmap bitmap)
    {
        TextureRes    textureRes= createTexture(bitmap);
        List<TextureLoad> arr=(List<TextureLoad>) this.loadDic.get(textureLoad.url);
        for (int i=0;i<arr.size();i++){
            arr.get(i).fun.Bfun(textureRes);
        }
        this.dic.put(textureLoad.url,textureRes);
        this.loadDic.remove(textureLoad.url);
    }
    public TextureRes createTexture(Bitmap bitmap){
        TextureRes  textureRes=new TextureRes(scene3D);
        textureRes.bitmap=bitmap;
        _waitArr.add(textureRes);
        return  textureRes;
    }
    private List<TextureRes> _waitArr=new ArrayList<>();
    public void upDataGenTextUserItem(){
        while (_waitArr.size()>0){
            TextureRes textureRes=   _waitArr.remove(0);
            textureRes.textTureInt=createTextureBase(textureRes.bitmap);
        }
    }
    private int createTextureBase(Bitmap bitmap){
        int[] texture=new int[1];
        if(bitmap!=null&&!bitmap.isRecycled()){
            //生成纹理
            GLES20.glGenTextures(1,texture,0);
            //生成纹理
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,texture[0]);

            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_CLAMP_TO_EDGE);
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_CLAMP_TO_EDGE);

            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_REPEAT);
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_REPEAT);

            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER,GLES20.GL_NEAREST);
            GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,GLES20.GL_TEXTURE_MAG_FILTER,GLES20.GL_LINEAR);

            //根据以上指定的参数，生成一个2D纹理
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, bitmap, 0);
            return texture[0];
        }
        return 0;
    }





}

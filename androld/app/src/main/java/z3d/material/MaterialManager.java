package z3d.material;

import android.graphics.Bitmap;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.ResGC;
import z3d.base.TexTuresBackFun;
import z3d.filemodel.TextureManager;
import z3d.program.Shader3D;

public class MaterialManager extends ResGC {



    public HashMap loadDic;
    public HashMap resDic;
    public HashMap regDic;

    private static MaterialManager _instance;
    public static MaterialManager getInstance()  {
        if (MaterialManager._instance==null) {
            MaterialManager._instance = new MaterialManager();
        }
        return MaterialManager._instance;
    }
    public MaterialManager( ) {

        super();
        this.loadDic=new HashMap();
        this.resDic=new HashMap();
        this.regDic=new HashMap();


    }

    public TextureRes  getMaterialByUrl(String url)
    {

        TextureRes textureRes= new TextureRes();
        Bitmap b = Bitmap.createBitmap(512, 512, Bitmap.Config.RGB_565);
        textureRes.textTureInt= this.createTexture(b);
        return  textureRes;

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
    public void addResByte(String url, ByteArray data) {

        if (! this.dic.containsKey(url) && ! this.resDic.containsKey(url)) {
            this.resDic.put(url,data);
        }


    }
    public void getMaterialByte(String url, MaterialBackFun materialBfun )
    {
        if(this.dic.containsKey(url)){
            materialBfun.Bfun((Material)this.dic.get(url));
            return;
        }

        MaterialLoad materialLoad=new MaterialLoad(materialBfun,null,url,true,"",new Shader3D());

        if(this.loadDic.containsKey(url)){
            List arr=(List) this.loadDic.get(url);
            arr.add(materialLoad);
            return;

        }
        List newArr=new ArrayList();
        newArr.add(materialLoad);
        this.loadDic.put(url,newArr);
        if(this.regDic.containsKey(url)){
            this.meshByteMaterialByte((ByteArray)this.regDic.get(url), materialLoad);
            this.regDic.remove(url);

        }else{
            Log.d("需要加载功能", "getMaterialByte: ");
        }


    }
    private  void   loadMaterial(Material material)
    {
        List texVec =material.texList;
        for (int i = 0; i < texVec.size(); i++) {

            TexItem texItem=(TexItem)texVec.get(i);
            if (texItem.isParticleColor ||texItem.isDynamic || texItem.type != 0) {
                continue;
            }
            TextureManager.getInstance().getTexture(texItem.url, new TexTuresBackFun() {
                @Override
                public void Bfun(TextureRes value) {
                    Log.d("", "Bfun: "+value);
                }
            });

        }

        /*

        for (var i: number = 0; i < texVec.length; i++) {
        if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
            continue;
        }
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + texVec[i].url, ($textureVo: TextureRes, $texItem: TexItem) => {
            $texItem.textureRes = $textureVo;
        }, texVec[i].wrap, texVec[i], texVec[i].filter, texVec[i].mipmap);

         */
    }

    private  void meshByteMaterialByte(ByteArray _byte,MaterialLoad _info)
    {

        Material material = new Material();
        material.setByteData(_byte);
        material.url = _info.url;
        this.loadMaterial(material);

       List arr= (List) this.loadDic.get(_info.url);
       for (int i=0;i<arr.size();i++){
           MaterialLoad materialLoad=(MaterialLoad)arr.get(i);
           materialLoad.fun.Bfun(material);
       }

       this.loadDic.remove(_info.url);
       this.dic.put(_info.url,material);

     }

}

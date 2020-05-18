package z3d.display;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.ETC1Util;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.util.Log;

import androidx.appcompat.widget.VectorEnabledTintResources;

import org.json.JSONObject;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;

import z3d.base.ObjData;
import z3d.base.ObjDataBackFun;
import z3d.base.ObjDataManager;
import z3d.core.Context3D;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class BuildDisplay3DSprite extends Display3DSprite {

    public static String TAG="Display3DSprite";
    public String lighturl;
    public void  setInfo(JSONObject value)
    {

        try {
            this.x=(float) value.getDouble("x");
            this.y=(float) value.getDouble("y");
            this.z=(float) value.getDouble("z");

            this.scaleX=(float) value.getDouble("scaleX");
            this.scaleY=(float) value.getDouble("scaleY");
            this.scaleZ=(float) value.getDouble("scaleZ");

            this.rotationX=(float) value.getDouble("rotationX");
            this.rotationY=(float) value.getDouble("rotationY");
            this.rotationZ=(float) value.getDouble("rotationZ");

            this.setObjUrl(value.getString("objsurl"));



        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    private int textureBase;
    public void makeBaseTexture(Bitmap bmp)
    {

            Bitmap b = Bitmap.createBitmap(512, 512, Bitmap.Config.RGB_565);
            this.textureBase= this.createTexture(bmp);

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

    @Override
    protected void makeTempObjData() {

    }

    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(BuildDisplay3DShader.shaderStr,new BuildDisplay3DShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(BuildDisplay3DShader.shaderStr);

        int a1=GLES20.glGetAttribLocation(this.shader3D.program, "vPosition");
        int a2=GLES20.glGetAttribLocation(this.shader3D.program, "vColorv3d");
        Log.d("", "registetProgame: ");

    }

    public void  setObjUrl(String value)
    {
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/ljtai_fb_youtai_0.xml" -> {ObjData@12838}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_zuotai_0.xml" -> {ObjData@12840}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/ljtai_fb_zhongtai_0.xml" -> {ObjData@12842}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_texiao_0.xml" -> {ObjData@12844}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_tiankong_0.xml" -> {ObjData@12846}
    //   value="content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_texiao_0.xml";
        Log.d(TAG, "value: "+value);
        ObjDataManager.getInstance().getObjData(value, new ObjDataBackFun() {
            @Override
            public void Bfun(ObjData value) {
                objData=value;
            }
        });

    }


    @Override
    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;
        if(this.objData!=null&&this.shader3D!=null &&this.textureBase>0 ){

            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);

            Matrix3D m=new Matrix3D();
            m.appendScale(1,1,1);

            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vTextCoord",2,this.objData.uvBuffer);



            int textureSlot= GLES20.glGetUniformLocation(this.shader3D.program,"colorMap");
            GLES20.glActiveTexture(GLES20.GL_TEXTURE0);
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,this.textureBase);
            GLES20.glUniform1f(textureSlot,0);



            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);

            GLES20.glDisableVertexAttribArray(0);
            GLES20.glDisableVertexAttribArray(1);


        }


    }

}

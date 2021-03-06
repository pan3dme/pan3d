package com.pan3d.res;

import android.util.Log;

import com.pan3d.base.ByteArray;
import com.pan3d.base.CallBackFun;
import com.pan3d.base.Scene_data;
import com.pan3d.scene.Scene3D;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;


public class SceneRes extends BaseRes {

    public  JSONObject  sceneData;
    private CallBackFun sceneFinishFun;
    public  SceneRes(Scene3D val  ){
        super(val);

    }
    public void load(String url ,final CallBackFun bfun) {
        scene3D.loadManager.loadUrl(Scene_data.fileRoot+url, LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    ByteArray temp=(ByteArray)dic.get("byte");
                    loadComplete(temp,bfun);
                }
            }
        },null);
    }
    public void  loadComplete(ByteArray buffByte, CallBackFun bfun)
    {
        this.sceneFinishFun=bfun;
        this._byte =buffByte;
        this.applyByteArray();
    }
    public void applyByteArray() {

        this.version = this._byte.readInt();
        Log.d("SceneRes版本 ->",   this.version+"===> " );
        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });
    }
    private void   readNext()
    {
        read();
        read();
        read();

        this.readScene();


    }
    private void  readScene()
    {
        int types = this._byte.readInt();
        this.readAstat();

        if (this.version >= 28) {
            this.readTerrainIdInfoBitmapData(this._byte);
        }
        int size   = this._byte.readInt();
        try {
            this.sceneData= new JSONObject(this._byte.readUTFBytes(size));

        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.d("partic地址 ->",   "aa");


        this.sceneFinishFun.StateChange(true);

    }
    private void readTerrainIdInfoBitmapData(ByteArray $byte) {
        int $len = $byte.readInt();
        if ($len>0) {
            byte[] objByte= $byte.readBytes($len);

        }

    }

    private void readAstat() {
        boolean hasAstat = this._byte.readBoolean();
        if (hasAstat) {

            float midu = this._byte.readFloat();
            float aPosx = this._byte.readFloat();
            float aPosy = this._byte.readFloat();
            float aPosz = this._byte.readFloat();
            int i ;
            int j;
            int tw = this._byte.readInt();
            int th = this._byte.readInt();

            if (this.version < 25) {
                for (i = 0; i < th; i++) {

                    for (j = 0; j < tw; j++) {
                        this._byte.readFloat();
                    }

                }
                for (i = 0; i < th; i++) {

                    for (j = 0; j < tw; j++) {
                        this._byte.readFloat();
                    }

                }
            } else {
                this._byte.readFloat();
                this.readAstarFromByte(this._byte);
                this.readAstarFromByte(this._byte);



                for (i = 0; i < th; i++) {

                    for (j = 0; j < tw; j++) {
                        this._byte.readShort()  ;
                    }

                }

            }
        }
    }
    private void readAstarFromByte(ByteArray $byte){
        int $len = $byte.readUnsignedInt();
        int $intLen =(int) Math.ceil($len / 32.0f);
        for (int i = 0; i < $intLen; i++) {
            $byte.readUnsignedInt();

        }

    }



}

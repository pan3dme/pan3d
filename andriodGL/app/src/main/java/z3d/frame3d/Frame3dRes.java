package z3d.frame3d;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.json.JSONException;

import scene.CallBack;
import z3d.base.ByteArray;
import z3d.base.CallBackFun;

import z3d.base.Scene_data;

import z3d.res.BaseRes;

import z3d.units.LoadBackFun;
import z3d.units.LoadManager;

public class Frame3dRes extends BaseRes {
    private static final String TAG ="Frame3dRes" ;
    public boolean isReady;
    private CallBack _completeFun;
    public void load(String url, CallBack bfun){
        _completeFun=bfun;
        LoadManager.getInstance().loadUrl(Scene_data.fileRoot + url,LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    ByteArray temp=(ByteArray)dic.get("byte");
                    loadComplete(temp);
                }else{

                }
            }
        },null);
    }
    public int frameSpeedNum;
    public static String sceneFileroot;
    public static String fileName;
    public boolean haveVideo;
    public void loadComplete(ByteArray $byte) {
        this._byte =  $byte;
        this.version = this._byte.readInt();
        String $str  = this._byte.readUTF();
        String[] itemstr=  $str.split("/");
        Frame3dRes.sceneFileroot = $str.replace(itemstr[itemstr.length - 1], "");
        Frame3dRes.fileName = itemstr[itemstr.length - 1];
        this.frameSpeedNum = this._byte.readInt();

        Log.d(TAG, "版本"+ this.version+ "frameSpeedNum"+ this.frameSpeedNum);

        this.readSceneInfo();


        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });


    }
    public void readNext() {
        this.read();//obj
        this.read();//material
        this.read();//particle;
        this.readFrame3dScene();

    }
    public List<FrameNodeVo> frameItem;
    public float maxTime=0;
    public void readFrame3dScene() {
        try {
            this.frameItem =new ArrayList<>();
            int size = this._byte.readInt();
            JSONArray $scene = new JSONArray(this._byte.readUTFBytes(size));

            for (int i = 0; i < $scene.length(); i++) {
                FrameNodeVo $frameNodeVo = new FrameNodeVo();
                $scene.get(i);
                $frameNodeVo.writeObject((JSONObject)$scene.get(i));
                this.frameItem.add($frameNodeVo);
                this.maxTime=Math.max($frameNodeVo.maxTime,this.maxTime) ;
            }
            this._completeFun.StateChange(true);
            this.isReady=true;
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void readSceneInfo(){
        int size = this._byte.readInt();
        try {
            JSONObject $obj = new JSONObject(this._byte.readUTFBytes(size));
            this.haveVideo = $obj.getBoolean("haveVideo");
//            Scene_data.light.setData($obj.SunNrm, $obj.SunLigth, $obj.AmbientLight);
//            LightBmpModel.getInstance().videoLightUvData = $obj.videoLightUvData;

        } catch (JSONException e) {
            e.printStackTrace();
        }



    }




}

package z3d.frame3d;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import z3d.display.BuildDisplay3DSprite;

public class FrameNodeVo {
    private static final String TAG = "FrameNodeVo";
    public int type;
    public int id;
    public String name;
    public String url;
    public String resurl;
    public float curTime=1;
    public boolean noLight;
    public boolean directLight;
    public boolean receiveShadow;
    public String lighturl;

    public List<FrameLinePointVo> pointitem;
    public List materialInfoArr;

    public String materialurl;


    public float    maxTime;

    public void writeObject(JSONObject $obj) {
        try {
        this.id = $obj.getInt("id");
        this.name = $obj.getString("name");
        this.url = $obj.getString("url");
        JSONArray itememArr= $obj.getJSONArray("pointitem");
        this.pointitem = new ArrayList<>();
        for (int j = 0; j < itememArr.length(); j++) {
            FrameLinePointVo frameLinePointVo = new FrameLinePointVo();
            frameLinePointVo.writeObject((JSONObject) itememArr.get(j));
            this.maxTime=Math.max(frameLinePointVo.time,this.maxTime);
            this.pointitem.add(frameLinePointVo);
        }
        this.resurl = $obj.getString("resurl");
            if (   this.url.indexOf(".prefab")!=-1) {
                this.materialInfoArr = new ArrayList();
                JSONArray materialInfoArr=$obj.getJSONArray("materialInfoArr");
                for (int i = 0;  i < materialInfoArr.length(); i++) {
                    this.materialInfoArr.add(materialInfoArr.get(i));
                }
                this.noLight = $obj.getBoolean("noLight");
                this.directLight =$obj.getBoolean("directLight");
                this.receiveShadow =$obj.getBoolean("receiveShadow");
                if (this.noLight == false) {
                    this.lighturl = $obj.getString("lighturl");
                }
                this.materialurl = $obj.getString("materialurl");
                this.type = 1;
            }
            if (   this.url.indexOf(".lyf")!=-1) {
                this.type = 2;
            }
            if (   this.url.indexOf(".zzw")!=-1) {
                this.type = 3;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }




    }

}

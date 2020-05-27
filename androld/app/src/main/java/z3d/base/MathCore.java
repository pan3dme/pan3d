package z3d.base;

import android.content.Context;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import z3d.vo.Vector3D;

public class MathCore {
    public   static List ObjArrToList(JSONArray value)
    {
        List arr=new ArrayList();
        try {
            for(int i=0;i<value.length();i++){

                JSONObject obj=   value.getJSONObject(i);

                HashMap dic=new HashMap();
                dic.put("type",0);
                dic.put("name","param0");
                dic.put("url","content/finalscens/mapscene/copy/ba卦tai/tietu/ljfb_bagua.png");


                arr.add(dic);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  arr;

    }
}

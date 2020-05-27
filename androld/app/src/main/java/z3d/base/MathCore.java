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
        List<JSONObject> arr=new ArrayList();
        try {
            for(int i=0;i<value.length();i++){
                arr.add( value.getJSONObject(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  arr;

    }
}

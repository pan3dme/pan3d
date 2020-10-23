package z3d.base;

import android.content.Context;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import z3d.vo.Vector3D;

public class MathCore {
    public   static List<HashMap> ObjArrToList(JSONArray value)
    {
        List<HashMap> arr=new ArrayList();
        try {
            for(int i=0;value!=null&&i<value.length();i++){

                HashMap dic=new HashMap();
                JSONObject jsonObject= value.getJSONObject(i);
                Iterator<String> it = jsonObject.keys();
                while(it.hasNext()){
                    String key = it.next();
                    dic.put(key,jsonObject.get(key));
                }
                arr.add( dic);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  arr;

    }
}

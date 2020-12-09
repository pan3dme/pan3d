package com.z3d.base;

import com.z3d.res.MaterialInfoVo;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MathCore {
    public   static List<MaterialInfoVo> ObjArrToList(JSONArray value)
    {
        List<MaterialInfoVo> arr=new ArrayList();
        try {
            for(int i=0;value!=null&&i<value.length();i++){
                MaterialInfoVo materialInfoVo=new MaterialInfoVo();
                JSONObject jsonObject= value.getJSONObject(i);
                materialInfoVo.type=(int) jsonObject.get("type");
                materialInfoVo.name=(String) jsonObject.get("name");
                if(jsonObject.has("url")){
                    materialInfoVo.url=  (String) jsonObject.get("url");
                }
                if(jsonObject.has("x")){

                    materialInfoVo.x=(float) jsonObject.getInt("x");
                }
                if(jsonObject.has("y")){
                    materialInfoVo.y=(float) jsonObject.get("y");
                }
                if(jsonObject.has("z")){
                    materialInfoVo.z=(float) jsonObject.get("z");
                }
                arr.add( materialInfoVo);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  arr;

    }
}

package z3d.base;

import android.content.Context;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

import z3d.vo.Vector3D;

public class MathCore {
    public   static List ObjArrToList(JSONArray value)
    {
        List arr=new ArrayList();
        try {
            for(int i=0;i<value.length();i++){
                arr.add(value.get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  arr;

    }
}

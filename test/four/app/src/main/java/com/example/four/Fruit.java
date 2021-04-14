package com.example.four;

import java.util.ArrayList;
import java.util.Arrays;

import cn.leancloud.AVObject;
import cn.leancloud.json.JSONArray;

public class Fruit {
    private String name;
    private int id;
    public int type;
    private String title;
    private String text;
    private JSONArray picitem;
    public JSONArray sceneinfo;
    public  AVObject data;

    public Fruit(AVObject val ){
        try {
            this.data=val;
            this.id=val.getInt("id");
            this.type=val.getInt("type");
            this.title =val.getString("title");
            this.text=val.getString("text");
            this.picitem=      val.getJSONArray("picitem");
            this.sceneinfo=   val.getJSONArray("sceneinfo");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public String getTitle(){
        return title;
    }
    public String getText(){
        return text;
    }
    public String getSceneInfoSt(){

      String abc=  this.sceneinfo.toJSONString();

        return abc;

    }
    public String getImageUrlByIdx(int idx){
        String outUrl="";
        try {
            outUrl= (String)   this.picitem.get(idx);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return outUrl;
    }


}
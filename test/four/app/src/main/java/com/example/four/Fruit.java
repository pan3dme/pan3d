package com.example.four;

import org.json.JSONArray;
import org.json.JSONObject;

public class Fruit {
    private String name;
    private int id;
    public int type;
    private String tittle;
    private String text;
    private JSONArray picitem;
    public JSONArray sceneinfo;
    public  JSONObject data;

    public Fruit(JSONObject val ){

        try {
            this.data=val;
            this.id=val.getInt("id");
            this.type=val.getInt("type");
            this.tittle=val.getString("tittle");
            this.text=val.getString("text");
            this.picitem=val.getJSONArray("picitem");
            this.sceneinfo=val.getJSONArray("sceneinfo");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public String getName(){
        return text;
    }
    public String getImageOneUrl(){
        String outUrl="";
        try {
            outUrl=    this.picitem.getString(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        outUrl=outUrl.replace("<<<","/");
        return outUrl;
    }


}
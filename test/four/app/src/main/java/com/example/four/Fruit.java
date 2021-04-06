package com.example.four;

import org.json.JSONArray;
import org.json.JSONObject;

public class Fruit {
    private String name;
    private int imageId;
    private int id;
    private int type;
    private String tittle;
    private String text;
    private JSONArray picitem;
    private JSONArray sceneinfo;

    public Fruit(JSONObject val ){
        this.imageId=R.drawable.my_cell_sz001;
        try {
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

    public int getImageId(){
        return  imageId;
    }
}
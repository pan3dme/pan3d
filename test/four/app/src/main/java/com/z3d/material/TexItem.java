package com.z3d.material;

public class TexItem {
    private int _id;
    public int get_id() {
        return _id;
    }
    public void set_id(int _id) {
        this._id = _id;
        this.name = "fs"+_id;
    }
    public String url;
    public TextureRes textureRes;
    public boolean isDynamic;
    public String  paramName;
    public boolean  isParticleColor;
    public boolean isMain;
    public  int type;
    public String  name;
    public int  wrap;
    public  int filter;
    public  int mipmap;

    public static int LIGHTMAP = 1;
    public static int LTUMAP = 2;
    public static int CUBEMAP = 3;
    public static int HEIGHTMAP = 4;
    public static int REFRACTIONMAP = 5;



}

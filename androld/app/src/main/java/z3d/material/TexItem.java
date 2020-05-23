package z3d.material;

import z3d.vo.Vector3D;

public class TexItem {


    public int id;
    public String url;
    public TextureRes  textureRes;
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

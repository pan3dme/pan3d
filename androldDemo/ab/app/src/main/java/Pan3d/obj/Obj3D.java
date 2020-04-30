package Pan3d.obj;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.ArrayList;

/**
 * Created by wuwang on 2017/2/22
 */

public class Obj3D {
    public FloatBuffer vert;
    public int vertCount;
    public FloatBuffer vertNorl;
    public FloatBuffer vertTexture;

   

    private ArrayList<Float> tempVert;
    private ArrayList<Float> tempVertNorl;
    public ArrayList<Float> tempVertTexture;

    public int textureSMode;
    public int textureTMode;



}

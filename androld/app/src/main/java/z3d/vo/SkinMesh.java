package z3d.vo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.MeshData;
import z3d.engine.ResCount;

public class SkinMesh extends ResCount {

    public List<MeshData> meshAry ;

    public List<Matrix3D> bindPosMatrixAry;

    public List<Matrix3D> bindPosInvertMatrixAry ;

    public HashMap boneSocketDic;

    public float fileScale ;
    public float tittleHeight ;
    public Vector2D hitBox ;

    public int type ;

    public HashMap animDic ;

    public boolean ready ;

    public List<String>  animUrlAry ;


    public List<List<Float> >  lightData ;
    public List<Vector3D> hitPosItem;

    public HashMap allParticleDic;
    public String url;
    public boolean hasDestory ;


    public SkinMesh()
    {
        super();
        this.animDic=new HashMap();
        this.meshAry=new ArrayList<>();
    }
    public void makeHitBoxItem()
    {

    }
    public void addMesh(MeshData $mesh)
    {
        $mesh.uid = this.meshAry.size();
        this.meshAry.add($mesh);
    }
}

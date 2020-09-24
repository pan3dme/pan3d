package z3d.display.particle;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class CombineParticle {
    public CombineParticleData sourceData;
    public String url;
    private List<Display3DParticle> displayAry;
    public float _time;
    public float maxTime;
    public int type; //类型
    public Matrix3D bindMatrix;
    public Vector3D bindVecter3d;
    public Vector3D bindScale;
    public Matrix3D invertBindMatrix;
    private String _bindSocket;
    private float _rotationX;
    private float _rotationY;
    private float _rotationZ;
    private boolean _isInGroup;
    private Vector3D _groupPos;
    private Vector3D _groupRotation;
    private Vector3D _groupScale;
    public Matrix3D groupMatrix;
    public Matrix3D groupRotationMatrix;
    public boolean hasMulItem;
    public boolean sceneVisible;
    public boolean dynamic;
    public boolean hasDestory;


    public  CombineParticle()
    {
        this._time=0;
        this.displayAry=new ArrayList<>();
    }

    public void addPrticleItem(Display3DParticle dis) {
        dis.visible = true;
        dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
        this.displayAry.add(dis);

    }
    private String TAG="dd";
    public  void updateTime(float t)
    {


        this._time+=t;

        for(int i=0;i<this.displayAry.size();i++)
        {
            this.displayAry.get(i).updateTime(this._time);
        }
    }

    public  void  upframe()
    {

        for(int i=0;i<this.displayAry.size();i++)
        {
            this.displayAry.get(i).upframe();
        }
    }

}
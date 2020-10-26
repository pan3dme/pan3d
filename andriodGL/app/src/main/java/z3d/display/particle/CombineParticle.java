package z3d.display.particle;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;
import z3d.display.interfaces.IBind;
import z3d.event.BaseEvent;
import z3d.event.EventDispatcher;
import z3d.scene.Scene3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class CombineParticle  extends EventDispatcher {
    public CombineParticleData sourceData;
    public String url;
    public IBind _bindTarget;
    private List<Display3DParticle> displayAry;
    public float _time;
    public float maxTime;
    public int type; //类型
    public Matrix3D bindMatrix;
    public Vector3D bindVecter3d;
    public Vector3D bindScale;
    public Matrix3D invertBindMatrix;
    public String bindSocket;
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
    private String TAG="CombineParticle";
    public IBind getBindTarget() {
        return _bindTarget;
    }

    public void setBindTarget(IBind val) {
        this._bindTarget = val;
    }

    public  CombineParticle()
    {
        this._time=0;
        this.displayAry=new ArrayList<>();
        this.bindVecter3d =new Vector3D();
        this.bindScale = new Vector3D(1,1,1);
        this.bindMatrix = new Matrix3D();
        this.invertBindMatrix = new Matrix3D();
        this.groupMatrix =  new Matrix3D();
        this.groupRotationMatrix =new Matrix3D();
    }

    public void addPrticleItem(Display3DParticle dis) {
        dis.visible = true;
        dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
        this.displayAry.add(dis);

    }

    public  void updateTime(float t)
    {
        this._time+=t;
        for(int i=0;i<this.displayAry.size();i++)
        {
            this.displayAry.get(i).updateTime(this._time);
        }
        this.updateBind();
        if (this._time >= this.maxTime) {
            Log.d(TAG, "updateTime: 播放技能结束");
            this.dispatchEvent(new BaseEvent(BaseEvent.COMPLETE));
        }
    }

    private void updateBind() {
        if (this._bindTarget!=null) {
            this._bindTarget.getSocket(this.bindSocket, this.bindMatrix);
            this.bindVecter3d.setTo(this.bindMatrix.get_x(), this.bindMatrix.get_y(), this.bindMatrix.get_z());
            this.bindMatrix.identityPostion();
            if (!this.groupRotationMatrix.isIdentity) {
                this.bindMatrix.copyTo(this.invertBindMatrix);
                this.invertBindMatrix.prepend(this.groupRotationMatrix);
                this.invertBindMatrix.invert();
            } else {
                this.bindMatrix.invertToMatrix(this.invertBindMatrix);
            }


        }
    }

    public  void upData(Scene3D val)
    {

        for(int i=0;i<this.displayAry.size();i++)
        {
            this.displayAry.get(i).scene3d=val;
            this.displayAry.get(i).update();
        }
    }

    public void setGroup(Vector3D posV3d, Vector3D rotationV3d, Vector3D scaleV3d) {

    }

    public void reset() {
        this._time = 0;
        for (int i = 0; i < this.displayAry.size(); i++) {
            this.displayAry.get(i).reset();
        }
    }
}
package com.z3d.display.particle;

import android.util.Log;

import com.z3d.display.interfaces.IBind;
import com.z3d.display.particle.model.Display3DModelPartilce;
import com.z3d.event.BaseEvent;
import com.z3d.event.EventDispatcher;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Matrix3D;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.List;

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
    public void setScaleX(float value){
        this.bindScale.x = value;
    }
    public void setScaleY(float value){
        this.bindScale.y = value;
    }
    public void setScaleZ(float value){
        this.bindScale.z = value;
    }

    public void setX(float value){
        this.bindVecter3d.x = value;
    }
    public void setY(float value){
        this.bindVecter3d.y = value;
    }
    public void setZ(float value){
        this.bindVecter3d.z = value;
    }
    public void setRotationX(float value){
        _rotationX=value;
    }
    public void setRotationY(float value){
        _rotationY=value;
    }
    public void setRotationZ(float value){
        _rotationZ=value;
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
            Display3DParticle display3DParticle= this.displayAry.get(i);
            display3DParticle.scene3D =val;
            if(display3DParticle instanceof Display3DModelPartilce){
            }
            display3DParticle.update();
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

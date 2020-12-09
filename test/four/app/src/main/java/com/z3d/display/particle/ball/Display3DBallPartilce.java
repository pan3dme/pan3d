package com.z3d.display.particle.ball;


import com.z3d.base.Camera3D;
import com.z3d.base.ObjData;
import com.z3d.base.Scene_data;
import com.z3d.core.Context3D;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.vo.Vector3D;

public class Display3DBallPartilce extends Display3DParticle {

    @Override
    public void setVc() {
        super.setVc();
        this. setViewCamModeMatr3d();
        Context3D ctx=this.scene3d.context3D;
        this.updateWatchCaramMatrix();
        ctx.setVcMatrix4fv(this.shader3D,"rotMatrix",this.rotationMatrix3D.m);
        Vector3D timeVec =   this.ballData()._timeVec;
        timeVec.x=this._time/ Scene_data.frameTime*this.ballData()._playSpeed;
        ctx.setVcUniform4f(this.shader3D,"vcmat50",timeVec.x,timeVec.y,timeVec.z,timeVec.w);
        Vector3D scaleVec =   this.ballData()._scaleVec;
        ctx.setVcUniform4f(this.shader3D,"vcmat51",scaleVec.x,scaleVec.y,scaleVec.z,scaleVec.w);
        Vector3D scaleCtrl =   this.ballData()._scaleCtrlVec;
        ctx.setVcUniform4f(this.shader3D,"vcmat52",scaleCtrl.x,scaleCtrl.y,scaleCtrl.z,scaleCtrl.w);
        Vector3D addSpeedVec =   this.ballData()._addSpeedVec;
        ctx.setVcUniform4f(this.shader3D,"vcmat53",addSpeedVec.x,addSpeedVec.y,addSpeedVec.z,addSpeedVec.w);

    }

    @Override
    public void update() {
        super.update();
    }

    @Override
    public void setVa() {
        super.setVa();

        Context3D ctx=this.scene3d.context3D;
        ParticleBallGpuData objData= (ParticleBallGpuData) this.particleGpuObjData();
        ctx.setVa(this.shader3D, "vPosition",4,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"texcoord",3,objData.uvBuffer);
        ctx.setVa(this.shader3D,"basePos",4,objData.basePosBuffer);
        ctx.setVa(this.shader3D,"speed",3,objData.speedBuffer);

        ctx.drawCall(objData.indexBuffer,objData.treNum);

    }

    private void updateWatchCaramMatrix() {

        this.rotationMatrix3D.identity();
        Camera3D cam3d=this.scene3d.camera3D;
        cam3d.upFrame();
        if (this.ballData().facez) {
            this.rotationMatrix3D.prependRotation(90.0f, Vector3D.X_AXIS);
        } else if (this.ballData()._is3Dlizi) {

        } else if (this.ballData()._watchEye) {
            this.rotationMatrix3D.prependRotation(cam3d.rotationX, Vector3D.X_AXIS);
            this.rotationMatrix3D.prependRotation(cam3d.rotationY, Vector3D.Y_AXIS);
        }
    }
    public ParticleBallData ballData(){
        return (ParticleBallData) this.data;
    }
    private ObjData particleGpuObjData()
    {
        return this.ballData().objData;
    }

}

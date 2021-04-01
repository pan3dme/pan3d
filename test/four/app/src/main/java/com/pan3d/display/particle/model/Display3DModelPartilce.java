package com.pan3d.display.particle.model;

import com.pan3d.base.Camera3D;
import com.pan3d.base.ObjData;
import com.pan3d.core.Context3D;
import com.pan3d.display.particle.Display3DParticle;
import com.pan3d.scene.Scene3D;

public class Display3DModelPartilce  extends Display3DParticle {

    public Display3DModelPartilce(Scene3D val) {
        super(val);
    }

    @Override
    public void update() {
        super.update();
    }
    @Override
    public void setVc() {
        super.setVc();
        Context3D ctx= scene3D.context3D;
        this.setViewCamModeMatr3d();
        this.updateRotaionMatrix();
        ctx.setVcMatrix4fv(this.shader3D,"rotMatrix",this.rotationMatrix3D.m);
    }
    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx= scene3D.context3D;
        ObjData objData= this.modelData().objData;
        ctx.setVa(this.shader3D,"v3Position",3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2TexCoord",2,objData.uvBuffer);
        ctx.drawCall(objData.indexBuffer,objData.treNum);
    }
    private void updateRotaionMatrix() {
        Camera3D cam= scene3D.camera3D;
        this.rotationMatrix3D.identity();
        if (this.data._watchEye) {
        }
        if (this.data._isZiZhuan) {
            this.timeline.applySelfRotation(this.rotationMatrix3D,this.data._ziZhuanAngly);
        }
    }
    public ParticleModelData modelData(){
        return (ParticleModelData) this.data;
    }
}

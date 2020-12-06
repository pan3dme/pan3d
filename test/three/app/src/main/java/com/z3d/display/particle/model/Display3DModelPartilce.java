package com.z3d.display.particle.model;

import com.z3d.base.Camera3D;
import com.z3d.base.ObjData;
import com.z3d.core.Context3D;
import com.z3d.display.particle.Display3DParticle;

public class Display3DModelPartilce  extends Display3DParticle {

    @Override
    public void update() {
        super.update();
    }
    @Override
    public void setVc() {
        super.setVc();
        Context3D ctx=this.scene3d.context3D;
        this.setViewCamModeMatr3d();
        this.updateRotaionMatrix();
        ctx.setVcMatrix4fv(this.shader3D,"rotMatrix",this.rotationMatrix3D.m);
    }
    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx=this.scene3d.context3D;
        ObjData objData= this.modelData().objData;
        ctx.setVa(this.shader3D,"v3Position",3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2TexCoord",2,objData.uvBuffer);
        ctx.drawCall(objData.indexBuffer,objData.treNum);
    }
    private void updateRotaionMatrix() {
        Camera3D cam=this.scene3d.camera3D;
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

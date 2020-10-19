package z3d.display.particle.facet;

import z3d.base.Camera3D;
import z3d.base.ObjData;
import z3d.core.Context3D;
import z3d.display.particle.Display3DParticle;
import z3d.display.particle.ball.ParticleBallData;
import z3d.display.particle.ball.ParticleBallGpuData;
import z3d.vo.Vector3D;

public class Display3DFacetParticle  extends Display3DParticle {


    @Override
    public void update() {
        super.update();
    }
    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx=this.scene3d.context3D;
        ObjData objData= this.ballData().objData;
        ctx.setVa(this.shader3D,"v3Position",3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2TexCoord",3,objData.uvBuffer);
        ctx.drawCall(objData.indexBuffer,objData.treNum);

    }

    @Override
    public void setVc() {
        super.setVc();
        Context3D ctx=this.scene3d.context3D;
        this.setViewCamModeMatr3d();
        this.updateRotaionMatrix();
        ctx.setVcMatrix4fv(this.shader3D,"rotMatrix",this.rotationMatrix3D.m);

    }
    private void updateRotaionMatrix() {
        Camera3D cam=this.scene3d.camera3D;
        this.rotationMatrix3D.identity();
        if (this.data._watchEye) {
            if (!this.ballData()._locky && !this.ballData()._lockx) {
                this.inverBind();
            }
            if (!this.ballData()._locky) {
                this.rotationMatrix3D.prependRotation(-cam.rotationY, Vector3D.Y_AXIS);
            }
            if (!this.ballData()._lockx) {
                this.rotationMatrix3D.prependRotation(-cam.rotationX, Vector3D.X_AXIS);
            }
        }
        if (this.data._isZiZhuan) {
            // this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
        }
    }

    private void inverBind() {
    }

    public ParticleFacetData ballData(){
        return (ParticleFacetData) this.data;
    }


}

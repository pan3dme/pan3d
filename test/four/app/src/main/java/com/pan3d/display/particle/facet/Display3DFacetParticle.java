package com.pan3d.display.particle.facet;

import com.pan3d.base.Camera3D;
import com.pan3d.base.ObjData;
import com.pan3d.base.Scene_data;
import com.pan3d.core.Context3D;
import com.pan3d.display.particle.Display3DParticle;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Vector2D;
import com.pan3d.vo.Vector3D;

public class Display3DFacetParticle  extends Display3DParticle {


    private static final String TAG ="Display3DFacetParticle" ;

    private Vector2D uvMove;

    @Override
    public void update() {
        super.update();
    }
    public Display3DFacetParticle(Scene3D val){
        super(val);
        this.uvMove=new Vector2D();
    }

    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx= scene3D.context3D;
        ParticleFacetData facetdata=this.getFaceData();
        ObjData objData= facetdata.objData;
        ctx.setVa(this.shader3D,"v3Position",3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2TexCoord",2,objData.uvBuffer);
        ctx.setVcUniform2f(this.shader3D,"uvMove",uvMove.x,uvMove.y);
        ctx.drawCall(objData.indexBuffer,objData.treNum);
    }

    @Override
    public void setVc() {
        super.setVc();
        Context3D ctx= scene3D.context3D;
        this.setViewCamModeMatr3d();
        this.updateRotaionMatrix();
        this.updateUV();
        ctx.setVcMatrix4fv(this.shader3D,"rotMatrix",this.rotationMatrix3D.m);
    }
    private void updateUV(){

        int currentFrame =(int) (this._time / Scene_data.frameTime);
        ParticleFacetData facetdata=this.getFaceData();
        if(facetdata.maxAnimTime<=1){
            return;
        }
        currentFrame =  currentFrame > facetdata.maxAnimTime ? (int)(facetdata.maxAnimTime ): currentFrame;
        currentFrame = (int)(currentFrame / this.data._animInterval) % (int)(this.data._animLine * this.data._animRow);
        uvMove.x=  (int)(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
        uvMove.y=  (int)(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;


    }
    private void updateRotaionMatrix() {
        Camera3D cam= scene3D.camera3D;
        this.rotationMatrix3D.identity();
        ParticleFacetData facetdata=this.getFaceData();
        if (this.data._watchEye) {
            if (!facetdata.locky && !facetdata.lockx) {
                this.inverBind();
            }
            if (!facetdata.locky) {
                this.rotationMatrix3D.prependRotation(-cam.rotationY, Vector3D.Y_AXIS);
            }
            if (!facetdata.lockx) {
                this.rotationMatrix3D.prependRotation(-cam.rotationX, Vector3D.X_AXIS);
            }
        }
        if (this.data._isZiZhuan) {
           // this.timeline.applySelfRotation(this.rotationMatrix3D,this.data._ziZhuanAngly);
        }
    }

    private void inverBind() {
    }
    public ParticleFacetData getFaceData(){
        return (ParticleFacetData) this.data;
    }


}

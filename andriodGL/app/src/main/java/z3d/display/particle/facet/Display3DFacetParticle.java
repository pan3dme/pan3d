package z3d.display.particle.facet;

import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import z3d.base.Camera3D;
import z3d.base.ObjData;
import z3d.base.Scene_data;
import z3d.core.Context3D;
import z3d.display.particle.Display3DParticle;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;

public class Display3DFacetParticle  extends Display3DParticle {


    private static final String TAG ="Display3DFacetParticle" ;

    private Vector2D uvMove;

    @Override
    public void update() {
        super.update();
    }
    public Display3DFacetParticle(){
        super();
        this.uvMove=new Vector2D();
    }

    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx=this.scene3d.context3D;
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
        Context3D ctx=this.scene3d.context3D;
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
        Camera3D cam=this.scene3d.camera3D;
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

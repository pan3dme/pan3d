package z3d.display.particle.locus;

import android.util.Log;

import z3d.base.ObjData;
import z3d.core.Context3D;
import z3d.display.particle.Display3DParticle;
import z3d.units.TimeUtil;

public class Display3DLocusPartilce extends Display3DParticle {

    private  static  String TAG="Display3DLocusPartilce->";
    public Display3DLocusPartilce()
    {

    }
    public ParticleLocusData locusdata(){
        return (ParticleLocusData)this.data;
    }
    private ObjData particleGpuObjData()
    {
        return this.locusdata().objData;
    }

    @Override
    public void update() {
        super.update();
    }

    public void creatData() {
        this.data = new ParticleLocusData();
    }

    @Override
    public void setVa() {
        Context3D ctx=this.scene3d.context3D;
        ObjData temp=  this.particleGpuObjData();

        Log.d(TAG, TimeUtil.getTimer()+"setVa: "+temp.verticeslist);
        Log.d(TAG, TimeUtil.getTimer()+"setVa: "+temp.vertexBuffer);


        /*


    [ctx pushVa: temp.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:temp.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2TexCoord" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: temp.nrmsBuffer];
    [ctx setVaOffset:self.shader3d name:"v3Normal" dataWidth:4 stride:0 offset:0];
        if(temp.nrms&&temp.nrms.count){
          [ctx drawCall:temp.indexBuffer  numTril:temp.trinum];
        }else{
            //需要处理，
        }

        */
    }

    @Override
    public void setVc() {
        super.setVc();
    }
    /*
    public setVa(): void {

        var tf: boolean = Scene_data.context3D.pushVa(this.data.objData.vertexBuffer);
        if (!tf) {
            Scene_data.context3D.setVaOffset(0, 3, this.data.objData.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, this.data.objData.stride, 28);
            if (this.data._watchEye) {
                Scene_data.context3D.setVaOffset(2, 4, this.data.objData.stride, 12);
            }
        }





        this.setMaterialTexture();

        Scene_data.context3D.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
    }

    public setVc(): void {
        this.updateUV();

        this.data.vcmatData.set(Scene_data.viewMatrx3D.m, 0);

        this.data.vcmatData.set(Scene_data.cam3D.cameraMatrix.m, 16);

        this.data.vcmatData.set(this.modelMatrix.m, 32);

        this.data.vcmatData.set(this.locusdata._resultUvVec, 48);

        if (this.data._watchEye) {

            this.locusdata._caramPosVec[0] = Scene_data.cam3D.x;
            this.locusdata._caramPosVec[1] = Scene_data.cam3D.y;
            this.locusdata._caramPosVec[2] = Scene_data.cam3D.z;

            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "camPos", this.locusdata._caramPosVec);
            //this.data.setFloat32Vec("camPos", this.locusdata._caramPosVec);//52
            this.data.vcmatData.set(this.locusdata._caramPosVec, 52);
        }

        if (this.locusdata._changUv) {
            //Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "isUv", this.locusdata._uvVec);
            this.data.setFloat32Vec("isUv", this.locusdata._uvVec);//56
        }

        Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

        this.setMaterialVc();

    }

    public updateUV(): void {
        var $nowTime: number = this._time / Scene_data.frameTime;
        var $lifeRoundNum: number = (this.data._life / 100);
        var $moveUv: number = this.locusdata._speed * $nowTime / this.locusdata._density / 10
        if (this.locusdata._isEnd) {
            $moveUv = Math.min(1, $moveUv);
        }

        if (this.locusdata._isLoop) {
            if (this.locusdata._life) {
                $moveUv = $moveUv % ($lifeRoundNum + 1)
            } else {
                $moveUv = $moveUv % 1;
            }
        }

        this.locusdata._resultUvVec[0] = $moveUv;
    }

 */

}

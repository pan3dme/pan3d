module Pan3d {
    export class Display3DBallPartilce extends Display3DParticle {

        public constructor(value:Scene3D)
        {
            super(value);
            // this.scene3D.progrmaManager.registe(BallTestShader.BallTestShader,new BallTestShader(this.scene3D));
            // this.shader=  this.scene3D.progrmaManager.getProgram(BallTestShader.BallTestShader);
        }
        public setVc(): void {
            super.setVc();
           
            this.updateWatchCaramMatrix();
            this.setViewCamModeMatr3d();
            var ctx:Context3D=this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.data.materialParam.shader, "rotMatrix", this._rotationMatrix.m);

            var tm= this._time/ Scene3D.frameTime*this.balldata._playSpeed;
            var  timeVec:Vector3D  =   this.balldata._timeVec;
            timeVec.x=tm;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat50",[timeVec.x,timeVec.y,timeVec.z,timeVec.w])
            var  scaleVec:Vector3D  =   this.balldata._scaleVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat51",[scaleVec.x,scaleVec.y,scaleVec.z,scaleVec.w]);
            var  scaleCtrl:Vector3D  =   this.balldata._scaleCtrlVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat52",[scaleCtrl.x,scaleCtrl.y,scaleCtrl.z,scaleCtrl.w]);
            var  addSpeedVec:Vector3D  =   this.balldata._addSpeedVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat53",[addSpeedVec.x,addSpeedVec.y,addSpeedVec.z,addSpeedVec.w]);
 

        }
      
 

       
        public get balldata(): ParticleBallData {
            return <ParticleBallData>this.data;
        }

        private updateWatchCaramMatrix(): void {
         
            this._rotationMatrix.identity();
 
            if (this.balldata.facez) {
                this._rotationMatrix.prependRotation(90, Vector3D.X_AXIS);
            } else if (this.balldata._is3Dlizi) {
             
                this.timeline.inverAxisRotation(this._rotationMatrix);
            
            } else if (this.balldata._watchEye) {
            
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Vector3D.X_AXIS);

            }
          


        }
       
        public setVa(): void {
            
            var ctx: Context3D = this.scene3D.context3D;
            var tf: boolean = ctx.pushVa(this.data.objData.vertexBuffer);
            if (tf) {
                return;
            }
            ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
            ctx.setVaOffset(1, 3, this.data.objData.stride, 12);
            ctx.setVaOffset(2, 4, this.data.objData.stride, 24);
            ctx.setVaOffset(3, 3, this.data.objData.stride, 40);
            if (this.balldata._needSelfRotation) {
                ctx.setVaOffset(4, 2, this.data.objData.stride, 52);
            }
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
          

        }
    }
}
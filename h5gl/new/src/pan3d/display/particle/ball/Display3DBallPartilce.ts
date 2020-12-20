module Pan3d {
    export class Display3DBallPartilce extends Display3DParticle {

        public setVc(): void {
            super.setVc();
            this.setViewCamModeMatr3d();
            var ctx: Context3D = this.scene3D.context3D;
            this.updateWatchCaramMatrix();
            ctx.setVcMatrix4fv(this.shader, "rotMatrix", this._rotationMatrix.m);
            
            var timeVec: Vector3D = this.balldata._timeVec;
            timeVec.x = this._time / Scene3D.frameTime * this.balldata._playSpeed;
            ctx.setVc4fv(this.shader, "vcmat50", [timeVec.x, timeVec.y, timeVec.z, timeVec.w]);
            var scaleVec: Vector3D = this.balldata._scaleVec;
            ctx.setVc4fv(this.shader, "vcmat51", [scaleVec.x, scaleVec.y, scaleVec.z, scaleVec.w]);
            var scaleCtrl: Vector3D = this.balldata._scaleCtrlVec;
            ctx.setVc4fv(this.shader, "vcmat52", [scaleCtrl.x, scaleCtrl.y, scaleCtrl.z, scaleCtrl.w]);
            var addSpeedVec: Vector3D = this.balldata._addSpeedVec;
            ctx.setVc4fv(this.shader, "vcmat53", [addSpeedVec.x, addSpeedVec.y, addSpeedVec.z, addSpeedVec.w]);


        }
        public updateWatchCaramMatrix(): void {
         
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
        public get balldata(): ParticleBallData {
            return <ParticleBallData>this.data;
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
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);

        }
    }
}
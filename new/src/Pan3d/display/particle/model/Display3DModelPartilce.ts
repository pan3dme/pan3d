module Pan3d {
    export class Display3DModelPartilce extends Display3DParticle {
 
        protected _resultUvVec: Array<number>;
        public constructor(value:Scene3D) {
            super(value);
            this._resultUvVec = new Array(2);
        }

        public get modeldata(): ParticleModelData {
            return <ParticleModelData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleModelData(this.scene3D);
        }
        public setVc(): void {

            super.setVc();
            var  ctx:Context3D= this.scene3D.context3D;
            this.setViewCamModeMatr3d();
            this.updateRotaionMatrix();
            ctx.setVcMatrix4fv(this.shader,"rotMatrix",this._rotationMatrix.m);

        }
      
        public updateRotaionMatrix(): void {
            this._rotationMatrix.identity();

            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);

                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Vector3D.Y_AXIS);

                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Vector3D.X_AXIS);
            }

            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }
 

        }

        public setVa(): void {
         
            super.setVa();
            var ctx:Context3D=this.scene3D.context3D;
            ctx.setWriteDepth((<ParticleModelData >this.data)._depthMode == 1)
            var tf: boolean =ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            this.setMaterialTexture();
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);

            ctx.setWriteDepth(false)
          
        }

        
 
 


    }
}
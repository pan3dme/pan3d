module Pan3d {
    export class Display3DFacetParticle extends Display3DParticle {
        private uvMove: Vector2D;
        constructor(value: Scene3D) {
            super(value);
            this.uvMove = new Vector2D();
        }
        public get facetdata(): ParticleFacetData {
            return <ParticleFacetData>this.data;
        }
        public creatData(): void {
            this.data = new ParticleFacetData(this.scene3D);
        }
        public setVc(): void {

            super.setVa();
            this.setViewCamModeMatr3d();
            this.updateRotaionMatrix();
            this.updateUV();
          
        }
        private updateRotaionMatrix():void
        {
            this._rotationMatrix.identity();
            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);

                if (!this.facetdata._locky && !this.facetdata._lockx) {
                    this.inverBind();
                }
                if (!this.facetdata._locky) {
                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Vector3D.Y_AXIS);
                }
                if (!this.facetdata._lockx) {
                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Vector3D.X_AXIS);
                }
            }

            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }

        }
        public updateUV(): void {

            var currentFrame: number = float2int(this._time / Scene3D.frameTime);
            currentFrame = currentFrame > this.facetdata._maxAnimTime ? this.facetdata._maxAnimTime : currentFrame;
            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);

            this.uvMove.x = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene3D.frameTime * this.data._uSpeed;
            this.uvMove.y = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene3D.frameTime * this.data._vSpeed;

        }
        private  inverBind():void {
        }
        public setVa(): void {
            var ctx: Context3D = this.scene3D.context3D;
            if (this.data.materialParam) {
                ctx.setProgram(this.data.materialParam.program);
            }
            var tf: boolean = ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }


    }
}
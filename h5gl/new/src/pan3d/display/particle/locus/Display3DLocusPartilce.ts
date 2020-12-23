module Pan3d {
    export class Display3DLocusPartilce extends Display3DParticle {


        public get locusdata(): ParticleLocusData {
            return <ParticleLocusData>this.data;
        }
        public creatData(): void {
            this.data = new ParticleLocusData(this.scene3D);
        }
        public setVa(): void {

            var ctx:Context3D=this.scene3D.context3D;
            var tf: boolean =ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.data.objData.stride, 28);
                if (this.data._watchEye) {
                    ctx.setVaOffset(2, 4, this.data.objData.stride, 12);
                }
            }
            this.setMaterialTexture();
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        }

        public setVc(): void {
            this.updateUV();
            var ctx:Context3D=this.scene3D.context3D;
            this.setViewCamModeMatr3d();
           
            ctx.setVc3fv(this.shader,"vcmat30",this.locusdata._resultUvVec);

            if(this.data._watchEye){
                var cam3D:Camera3D=this.scene3D.cam3D;
                ctx.setVc4fv(this.shader,"v3CamPos",[cam3D.x,cam3D.y,cam3D.z,cam3D.w]);
            }
            if (this.locusdata._changUv) {
               
            }
             this.setMaterialVc();

        }

        public updateUV(): void {
            var $nowTime: number = this._time / Scene3D.frameTime;
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


 

    }
}
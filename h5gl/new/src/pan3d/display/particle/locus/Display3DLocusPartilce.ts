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
        
            this.data.vcmatData.set(this.scene3D.viewMatrx3D.m, 0);
    
            this.data.vcmatData.set(this.scene3D.cam3D.cameraMatrix.m, 16);
        
            this.data.vcmatData.set(this.modelMatrix.m, 32);
       
            this.data.vcmatData.set(this.locusdata._resultUvVec, 48);

            if (this.data._watchEye) {

                this.locusdata._caramPosVec[0] = this.scene3D.cam3D.x;
                this.locusdata._caramPosVec[1] = this.scene3D.cam3D.y;
                this.locusdata._caramPosVec[2] = this.scene3D.cam3D.z;
 
                this.data.vcmatData.set(this.locusdata._caramPosVec, 52);
            }

            if (this.locusdata._changUv) {
                this.data.setFloat32Vec("isUv", this.locusdata._uvVec);//56
            }

            ctx.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);

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
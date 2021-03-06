module Pan3d {
    export class ParticleLocusData extends ParticleData {
        public _speed: number = 1;   //粒子运动数字
        public _isLoop: boolean = false;  //是否循环
        public _density: number;
        public _isEnd: boolean;

        public _resultUvVec: Array<number>;
        public _caramPosVec: Array<number>;
        public _changUv: boolean;
        public _uvVec: Array<number>;

        public getParticle(): Display3DParticle {
            return new Display3DLocusPartilce(this.scene3D);
        }

        public setAllByteInfo($byte: Pan3dByteArray): void {

            this._isLoop = $byte.readBoolean()  //b
            this._speed = $byte.readFloat() //f
            this._density = $byte.readFloat() //f
            this._isEnd = $byte.readBoolean() //b

            this.objData = new ObjData(this.scene3D);

            var vLen: number = $byte.getInt();
            var dataWidth = 9;
            var len: number = vLen * dataWidth * 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
            BaseRes.readBytes2ArrayBuffer($byte, data, 4, 3, dataWidth, 4);//normal
            BaseRes.readBytes2ArrayBuffer($byte, data, 2, 7, dataWidth, 4);//uv
 
            var iLen: number = $byte.readInt();
            for (var k: number = 0; k < iLen; k++) {
                this.objData.indexs.push($byte.readInt())
            }

            this.objData.stride = dataWidth * 4;


            super.setAllByteInfo($byte);

            this.initUV();

            if (this._watchEye) {
                this._caramPosVec = [0, 0, 0];
            }

            this._uvVec = [this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1]
 

            this.initVcData();

            var ctx:Context3D=this.scene3D.context3D;
            this.objData.vertexBuffer = ctx.uploadBuff3DArrayBuffer(arybuff);
            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;

        }

        public initUV(): void {
            this._resultUvVec = new Array(3);

            var $nowTime: number = 0;
            var $lifeRoundNum: number = (this._life / 100);
            var $moveUv: number = this._speed * $nowTime / this._density / 10
            if (this._isEnd) {
                $moveUv = Math.min(1, $moveUv);
            }
            var $fcVector: Vector3D;
            if (this._isLoop) {
                if (this._life) {
                    $moveUv = $moveUv % ($lifeRoundNum + 1)
                    $fcVector = new Vector3D($moveUv, $lifeRoundNum, -$lifeRoundNum);
                } else {
                    $moveUv = $moveUv % 1;
                    $fcVector = new Vector3D($moveUv + 1, 99, -2);
                }
            } else {
                if (this._life) {
                    $fcVector = new Vector3D($moveUv, $lifeRoundNum, -1);
                } else {
                    $fcVector = new Vector3D($moveUv, 99, -1);
                }
            }

            this._resultUvVec[0] = $fcVector.x;
            this._resultUvVec[1] = $fcVector.y;
            this._resultUvVec[2] = $fcVector.z;
        }

        public uploadGpu(): void {

            var ctx:Context3D=this.scene3D.context3D;


            this.objData.vertexBuffer = ctx.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = ctx.uploadBuff3D(this.objData.uvs);
            if (this._watchEye) {
                this.objData.normalsBuffer =ctx.uploadBuff3D(this.objData.normals);
            }
            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);

            this.objData.treNum = this.objData.indexs.length;

        }

        public regShader(): void {
            if (!this.materialParam) {
                return;
            }

            var isWatchEye: number = this._watchEye ? 1 : 0;
            var changeUv: number = 0;

            var hasParticleColor: boolean = this.materialParam.material.hasParticleColor;

            if (this._isU || this._isV || this._isUV) {
                changeUv = 1;
                this._changUv = true;
            } else {
                this._changUv = false;
            }

            var shaderParameAry: Array<number>;

            shaderParameAry = [isWatchEye, changeUv, hasParticleColor ? 1 : 0];

            //var shader: Display3DLocusShader = new Display3DLocusShader();
            this.materialParam.shader =this.scene3D.progrmaManager.getMaterialProgram(Display3DLocusShader.Display3D_Locus_Shader,
                Display3DLocusShader, this.materialParam.material, shaderParameAry);
     
        }

        public initVcData(): void {
            this.vcmatData = new Float32Array(Display3DLocusShader.getVcSize() * 16);

        }

        public setFloat32Vec(key: string, ary: Array<number>): void {
            var idxary: Array<number> = Display3DLocusShader.shader_vec4[key];
            var idx: number = idxary[0] * 16 + idxary[1] * 4;
            this.vcmatData.set(ary, idx);
        }
        public setFloat32Mat(key: string, ary: Float32Array): void {
            var idx: number = Display3DLocusShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        }

    }
}
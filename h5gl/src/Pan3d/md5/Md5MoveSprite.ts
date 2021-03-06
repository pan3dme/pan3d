﻿
module md5list {
    import Display3DSprite = Pan3d.Display3DSprite
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import LoadManager = Pan3d.LoadManager
     
    import Quaternion = Pan3d.Quaternion
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import Matrix3D = Pan3d.Matrix3D
    import Scene3D = Pan3d.Scene3D
   
    import TextureManager = Pan3d.TextureManager
    import TextureRes = Pan3d.TextureRes
    import Vector3D = Pan3d.Vector3D
   


    export class Md5MoveSprite extends Display3DSprite {
        private md5shader: Shader3D
        constructor(value:Scene3D) {
            super(value);
            this.scene3D.progrmaManager.registe(Md5MeshShader.Md5MeshShader, new Md5MeshShader(this.scene3D));
            this.md5shader =this.scene3D.progrmaManager.getProgram(Md5MeshShader.Md5MeshShader);
            this.loadTexture();
        }
        public md5MeshData: Md5MeshData;
 
        protected loadBodyMesh(): void {
            LoadManager.getInstance().load(this.scene3D.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, ($str: any) => {
                this.md5MeshData = new Md5Analysis(this.scene3D).addMesh($str);
                new MeshImportSort(this.scene3D).processMesh(this.md5MeshData);
                 new MeshToObjUtils(this.scene3D).getObj(this.md5MeshData);
                this.loadAnimFrame();
            });
        }
        private bodyUrl: string;
        private animUrl: string;

        public setMd5url($bodyurl: string, $animurl: string, $picurl: string = null): void {
            this.bodyUrl = $bodyurl;
            this.animUrl = $animurl;
            if ($picurl) {
                this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + $picurl, ($texture: TextureRes) => {
                    this.uvTextureRes = $texture;
                });
            }
            this.loadBodyMesh();
        }
        public frameQuestArr: Array<DualQuatFloat32Array>;
        protected loadAnimFrame(): void {
            LoadManager.getInstance().load(this.scene3D.fileRoot  + this.animUrl, LoadManager.XML_TYPE, ($str: any) => {
                var $matrixAry: Array<Array<Matrix3D>> = new Md5animAnalysis().addAnim($str);
                this.frameQuestArr = new Array;
                for (var i: number = 0; i < $matrixAry.length; i++) {
                    var $frameAry: Array<Matrix3D> = $matrixAry[i];
                    for (var j: number = 0; j < $frameAry.length; j++) {
                        $frameAry[j].prepend(this.md5MeshData.invertAry[j]);
                    }
                    this.frameQuestArr.push(this.makeDualQuatFloat32Array($matrixAry[i]));
                }
            });
        }
        protected makeDualQuatFloat32Array($frameAry: Array<Matrix3D>): DualQuatFloat32Array {
            var newIDBoneArr: Array<number> = this.md5MeshData.boneNewIDAry
            var baseBone: Array<Matrix3D> = $frameAry;
            var $tempDq: DualQuatFloat32Array = new DualQuatFloat32Array;
            $tempDq.quat = new Float32Array(newIDBoneArr.length * 4);
            $tempDq.pos = new Float32Array(newIDBoneArr.length * 3);
            for (var k: number = 0; k < newIDBoneArr.length; k++) {
                var $m: Matrix3D = baseBone[newIDBoneArr[k]].clone();
                $m.appendScale(-1, 1, 1)  //特别标记，因为四元数和矩阵运算结果不一
                var $q: Quaternion = new Quaternion();
                $q.fromMatrix($m)
                var $p: Vector3D = $m.position;
                $tempDq.quat[k * 4 + 0] = $q.x;
                $tempDq.quat[k * 4 + 1] = $q.y;
                $tempDq.quat[k * 4 + 2] = $q.z;
                $tempDq.quat[k * 4 + 3] = $q.w;

                $tempDq.pos[k * 3 + 0] = $p.x;
                $tempDq.pos[k * 3 + 1] = $p.y;
                $tempDq.pos[k * 3 + 2] = $p.z;
            }
            return $tempDq
        }
        protected loadTexture(): void {
            

        }
        protected uvTextureRes: TextureRes
        private baseShder: Shader3D;
        public upFrame(): void {
            if (this.md5MeshData && this.frameQuestArr&& this.uvTextureRes) {
                this.updateMaterialMeshCopy();
            }
        }

        private lastTm: number = 0
        private _actionTime: number=0
        public updateMaterialMeshCopy(): void {
            

            this.baseShder = this.md5shader
            var context3D:Context3D=this.scene3D.context3D;
            context3D.setProgram(this.baseShder.program);
            context3D.setVcMatrix4fv(this.baseShder, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);

            context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
            context3D.setVa(0, 3, this.md5MeshData.vertexBuffer);
            context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
            context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
            context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);
 

            var t: number = Pan3d.TimeUtil.getTimer() - this.lastTm;
            this.lastTm = Pan3d.TimeUtil.getTimer()
            this._actionTime += t;


            var _curentFrame: number = float2int(this._actionTime / (Scene3D.frameTime * 2));

            var $len: number = this.frameQuestArr.length;
            var $dualQuatFloat32Array: DualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len]

            context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos);  //所有的位移

            context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);

        }
        private skipNum: number = 0

    }
}
module Pan3d {
    export class MeshDataManager extends ResGC {
        uploadPbrMesh($meshData: MeshData, useNormal: boolean) {
            throw new Error("Method not implemented.");
        }
      
      
        // private _dic: Object;
        private _loadDic: Object;
        public constructor(val:Scene3D){
            super(val);
            this._loadDic=new Object();
        }

        public getMeshData($url: string, bfun: Function) {

            var $batchNum:number=1;
         
            if (this.dic[$url] && this.dic[$url].ready) {
                bfun(this.dic[$url]);
                this.dic[$url].useNum++;
                return;
            }

            if (this._loadDic[$url]) {
                this._loadDic[$url].push(bfun);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(bfun);
 
            this.scene3D.resManager.loadRoleRes(this.scene3D.fileRoot + $url, ($roleRes: RoleRes) => {
                this.roleResCom($roleRes, bfun);
            }, $batchNum);
        }

        private roleResCom($roleRes: RoleRes, $fun: Function): void {

            var url: string = $roleRes.roleUrl;

            var skinMesh: SkinMesh = this.dic[url];
            skinMesh.loadMaterial();
            //skinMesh.loadParticle();
            skinMesh.setAction($roleRes.actionAry, url);
            skinMesh.url = url;
            if ($roleRes.ambientLightColor) {
                skinMesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
            }



            for (var i: number = 0; i < this._loadDic[url].length; i++) {
                this._loadDic[url][i](skinMesh);
               
            }
            delete this._loadDic[url];

            skinMesh.ready = true;

         

        }
        public readData(byte, $batchNum, $url, $version): SkinMesh {
            var $skinMesh: SkinMesh = new SkinMesh(this.scene3D);
            $skinMesh.fileScale = byte.readFloat();
            if ($version >= 19) {
                $skinMesh.tittleHeight = byte.readFloat();
            } else {
                $skinMesh.tittleHeight = 50;
            }
            $skinMesh.hitBox = new Vector2D(20, 20)
            if ($version >= 23) {
                $skinMesh.hitBox.x = byte.readFloat();
                $skinMesh.hitBox.y = byte.readFloat();
            }
            $skinMesh.makeHitBoxItem();

            var meshNum: number = byte.readInt();
            var allParticleDic: Object = new Object;
            for (var i: number = 0; i < meshNum; i++) {
                var meshData: MeshData = new MeshData(this.scene3D);
                if ($version >= 35) {
                    meshData.bindPosAry = this.readBindPosByte(byte)
                    meshData.getBindPosMatrix();
                }
                if ($version >= 21) {
                    this.readMesh2OneBuffer(byte, meshData);
                } 




                meshData.treNum = meshData.indexs.length;

                // if ($batchNum != 1) {
                //     this.cloneMeshData(meshData, $batchNum);
                // }

                meshData.materialUrl = byte.readUTF();
                meshData.materialParamData = BaseRes.readMaterialParamData(byte);

                var particleNum: number = byte.readInt();
                for (var j: number = 0; j < particleNum; j++) {

                    var bindParticle: BindParticle = new BindParticle(byte.readUTF(), byte.readUTF());
                    meshData.particleAry.push(bindParticle);
                    allParticleDic[bindParticle.url] = true;
                }

                $skinMesh.addMesh(meshData);


            }

            for (var key in allParticleDic) {
                this.scene3D.particleManager.registerUrl(key);
            }

            $skinMesh.allParticleDic = allParticleDic;

            if ($version < 35) { //多个MESH出错后情况
                var bindPosAry: Array<Array<number>> = this.readBindPosByte(byte);
                for (var w: number = 0; w < $skinMesh.meshAry.length; w++) {
                    $skinMesh.meshAry[w].bindPosAry = bindPosAry;
                    $skinMesh.meshAry[w].getBindPosMatrix()
                }
            }


            var sokcetLenght: number = byte.readInt();

            $skinMesh.boneSocketDic = new Object();

            for (var j: number = 0; j < sokcetLenght; j++) {
                var boneData: BoneSocketData = new BoneSocketData();
                boneData.name = byte.readUTF();
                boneData.boneName = byte.readUTF();
                boneData.index = byte.readInt();
                boneData.x = byte.readFloat();
                boneData.y = byte.readFloat();
                boneData.z = byte.readFloat();
                boneData.rotationX = byte.readFloat();
                boneData.rotationY = byte.readFloat();
                boneData.rotationZ = byte.readFloat();

                $skinMesh.boneSocketDic[boneData.name] = boneData;
            }

            this.dic[$url] = $skinMesh;

            return $skinMesh;
        }
        public readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void {
            var len: number = byte.readInt()

            var typeItem: Array<boolean> = new Array;
            var dataWidth: number = 0;
            for (var i: number = 0; i < 5; i++) {
                var tf: boolean = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    if (i == 1) {
                        dataWidth += 2;
                    } else {
                        dataWidth += 3;
                    }
                }
            }

            dataWidth += 8;

            len *= dataWidth * 4;

            var uvsOffsets: number = 3; // 1
            var normalsOffsets: number = uvsOffsets + 2; // 2
            var tangentsOffsets: number = normalsOffsets + 3; //3
            var bitangentsOffsets: number = tangentsOffsets + 3; //4
            var boneIDOffsets: number;
            if (typeItem[2]) {//normal
                if (typeItem[4]) {
                    boneIDOffsets = bitangentsOffsets + 3;
                } else {
                    boneIDOffsets = normalsOffsets + 3;
                }
            } else {
                boneIDOffsets = uvsOffsets + 2;
            }
            var boneWeightOffsets: number = boneIDOffsets + 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth);//vertices
            BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth);//uvs
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth);//normals
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth);//tangents
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth);//bitangents

            BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2);//boneIDAry
            BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1);//boneWeightAry


            // BaseRes.readFloatTwoByte(byte, meshData.vertices);
            // BaseRes.readFloatTwoByte(byte, meshData.uvs);
            // BaseRes.readFloatTwoByte(byte, meshData.normals);
            // BaseRes.readFloatTwoByte(byte, meshData.tangents);
            // BaseRes.readFloatTwoByte(byte, meshData.bitangents);

            // BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
            // BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);


            BaseRes.readIntForTwoByte(byte, meshData.indexs);
            BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);

            meshData.compressBuffer = true;
            meshData.uvsOffsets = uvsOffsets * 4;
            meshData.normalsOffsets = normalsOffsets * 4;
            meshData.tangentsOffsets = tangentsOffsets * 4;
            meshData.bitangentsOffsets = bitangentsOffsets * 4;

            meshData.boneIDOffsets = boneIDOffsets * 4;
            meshData.boneWeightOffsets = boneWeightOffsets * 4;

            meshData.stride = dataWidth * 4;


            var ctx:Context3D=this.scene3D.context3D

            meshData.vertexBuffer =ctx.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = ctx.uploadIndexBuff3D(meshData.indexs);

        }

        private readBindPosByte(byte: Pan3dByteArray): Array<Array<number>>  {
            var bindPosLength: number = byte.readInt();
            var bindPosAry: Array<Array<number>> = new Array;
            for (var j: number = 0; j < bindPosLength; j++) {
                var ary: Array<number> = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(),
                    byte.readFloat(), byte.readFloat(), byte.readFloat());
                bindPosAry.push(ary);
            }
            return bindPosAry

        }
    }
}
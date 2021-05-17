var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var MeshDataManager = /** @class */ (function (_super) {
        __extends(MeshDataManager, _super);
        function MeshDataManager(val) {
            var _this = _super.call(this, val) || this;
            _this._loadDic = new Object();
            return _this;
        }
        MeshDataManager.prototype.uploadPbrMesh = function ($meshData, useNormal) {
            throw new Error("Method not implemented.");
        };
        MeshDataManager.prototype.getMeshData = function ($url, bfun) {
            var _this = this;
            var $batchNum = 1;
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
            this.scene3D.resManager.loadRoleRes(this.scene3D.fileRoot + $url, function ($roleRes) {
                _this.roleResCom($roleRes, bfun);
            }, $batchNum);
        };
        MeshDataManager.prototype.roleResCom = function ($roleRes, $fun) {
            var url = $roleRes.roleUrl;
            var skinMesh = this.dic[url];
            skinMesh.loadMaterial();
            //skinMesh.loadParticle();
            skinMesh.setAction($roleRes.actionAry, url);
            skinMesh.url = url;
            if ($roleRes.ambientLightColor) {
                skinMesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                    [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                    [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
            }
            for (var i = 0; i < this._loadDic[url].length; i++) {
                this._loadDic[url][i](skinMesh);
            }
            delete this._loadDic[url];
            skinMesh.ready = true;
        };
        MeshDataManager.prototype.readData = function (byte, $batchNum, $url, $version) {
            var $skinMesh = new Pan3d.SkinMesh(this.scene3D);
            $skinMesh.fileScale = byte.readFloat();
            if ($version >= 19) {
                $skinMesh.tittleHeight = byte.readFloat();
            }
            else {
                $skinMesh.tittleHeight = 50;
            }
            $skinMesh.hitBox = new Pan3d.Vector2D(20, 20);
            if ($version >= 23) {
                $skinMesh.hitBox.x = byte.readFloat();
                $skinMesh.hitBox.y = byte.readFloat();
            }
            $skinMesh.makeHitBoxItem();
            var meshNum = byte.readInt();
            var allParticleDic = new Object;
            for (var i = 0; i < meshNum; i++) {
                var meshData = new Pan3d.MeshData(this.scene3D);
                if ($version >= 35) {
                    meshData.bindPosAry = this.readBindPosByte(byte);
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
                meshData.materialParamData = Pan3d.BaseRes.readMaterialParamData(byte);
                var particleNum = byte.readInt();
                for (var j = 0; j < particleNum; j++) {
                    var bindParticle = new Pan3d.BindParticle(byte.readUTF(), byte.readUTF());
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
                var bindPosAry = this.readBindPosByte(byte);
                for (var w = 0; w < $skinMesh.meshAry.length; w++) {
                    $skinMesh.meshAry[w].bindPosAry = bindPosAry;
                    $skinMesh.meshAry[w].getBindPosMatrix();
                }
            }
            var sokcetLenght = byte.readInt();
            $skinMesh.boneSocketDic = new Object();
            for (var j = 0; j < sokcetLenght; j++) {
                var boneData = new Pan3d.BoneSocketData();
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
        };
        MeshDataManager.prototype.readMesh2OneBuffer = function (byte, meshData) {
            var len = byte.readInt();
            var typeItem = new Array;
            var dataWidth = 0;
            for (var i = 0; i < 5; i++) {
                var tf = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    if (i == 1) {
                        dataWidth += 2;
                    }
                    else {
                        dataWidth += 3;
                    }
                }
            }
            dataWidth += 8;
            len *= dataWidth * 4;
            var uvsOffsets = 3; // 1
            var normalsOffsets = uvsOffsets + 2; // 2
            var tangentsOffsets = normalsOffsets + 3; //3
            var bitangentsOffsets = tangentsOffsets + 3; //4
            var boneIDOffsets;
            if (typeItem[2]) { //normal
                if (typeItem[4]) {
                    boneIDOffsets = bitangentsOffsets + 3;
                }
                else {
                    boneIDOffsets = normalsOffsets + 3;
                }
            }
            else {
                boneIDOffsets = uvsOffsets + 2;
            }
            var boneWeightOffsets = boneIDOffsets + 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2); //boneIDAry
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1); //boneWeightAry
            // BaseRes.readFloatTwoByte(byte, meshData.vertices);
            // BaseRes.readFloatTwoByte(byte, meshData.uvs);
            // BaseRes.readFloatTwoByte(byte, meshData.normals);
            // BaseRes.readFloatTwoByte(byte, meshData.tangents);
            // BaseRes.readFloatTwoByte(byte, meshData.bitangents);
            // BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
            // BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
            Pan3d.BaseRes.readIntForTwoByte(byte, meshData.indexs);
            Pan3d.BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
            meshData.compressBuffer = true;
            meshData.uvsOffsets = uvsOffsets * 4;
            meshData.normalsOffsets = normalsOffsets * 4;
            meshData.tangentsOffsets = tangentsOffsets * 4;
            meshData.bitangentsOffsets = bitangentsOffsets * 4;
            meshData.boneIDOffsets = boneIDOffsets * 4;
            meshData.boneWeightOffsets = boneWeightOffsets * 4;
            meshData.stride = dataWidth * 4;
            var ctx = this.scene3D.context3D;
            meshData.vertexBuffer = ctx.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = ctx.uploadIndexBuff3D(meshData.indexs);
        };
        MeshDataManager.prototype.readBindPosByte = function (byte) {
            var bindPosLength = byte.readInt();
            var bindPosAry = new Array;
            for (var j = 0; j < bindPosLength; j++) {
                var ary = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat());
                bindPosAry.push(ary);
            }
            return bindPosAry;
        };
        return MeshDataManager;
    }(Pan3d.ResGC));
    Pan3d.MeshDataManager = MeshDataManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MeshDataManager.js.map
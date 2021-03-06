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
var md5list;
(function (md5list) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var LoadManager = Pan3d.LoadManager;
    var Quaternion = Pan3d.Quaternion;
    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
    var Scene3D = Pan3d.Scene3D;
    var Md5MoveSprite = /** @class */ (function (_super) {
        __extends(Md5MoveSprite, _super);
        function Md5MoveSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.lastTm = 0;
            _this._actionTime = 0;
            _this.skipNum = 0;
            _this.scene3D.progrmaManager.registe(md5list.Md5MeshShader.Md5MeshShader, new md5list.Md5MeshShader(_this.scene3D));
            _this.md5shader = _this.scene3D.progrmaManager.getProgram(md5list.Md5MeshShader.Md5MeshShader);
            _this.loadTexture();
            return _this;
        }
        Md5MoveSprite.prototype.loadBodyMesh = function () {
            var _this = this;
            LoadManager.getInstance().load(this.scene3D.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, function ($str) {
                _this.md5MeshData = new md5list.Md5Analysis(_this.scene3D).addMesh($str);
                new md5list.MeshImportSort(_this.scene3D).processMesh(_this.md5MeshData);
                new md5list.MeshToObjUtils(_this.scene3D).getObj(_this.md5MeshData);
                _this.loadAnimFrame();
            });
        };
        Md5MoveSprite.prototype.setMd5url = function ($bodyurl, $animurl, $picurl) {
            var _this = this;
            if ($picurl === void 0) { $picurl = null; }
            this.bodyUrl = $bodyurl;
            this.animUrl = $animurl;
            if ($picurl) {
                this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + $picurl, function ($texture) {
                    _this.uvTextureRes = $texture;
                });
            }
            this.loadBodyMesh();
        };
        Md5MoveSprite.prototype.loadAnimFrame = function () {
            var _this = this;
            LoadManager.getInstance().load(this.scene3D.fileRoot + this.animUrl, LoadManager.XML_TYPE, function ($str) {
                var $matrixAry = new md5list.Md5animAnalysis().addAnim($str);
                _this.frameQuestArr = new Array;
                for (var i = 0; i < $matrixAry.length; i++) {
                    var $frameAry = $matrixAry[i];
                    for (var j = 0; j < $frameAry.length; j++) {
                        $frameAry[j].prepend(_this.md5MeshData.invertAry[j]);
                    }
                    _this.frameQuestArr.push(_this.makeDualQuatFloat32Array($matrixAry[i]));
                }
            });
        };
        Md5MoveSprite.prototype.makeDualQuatFloat32Array = function ($frameAry) {
            var newIDBoneArr = this.md5MeshData.boneNewIDAry;
            var baseBone = $frameAry;
            var $tempDq = new DualQuatFloat32Array;
            $tempDq.quat = new Float32Array(newIDBoneArr.length * 4);
            $tempDq.pos = new Float32Array(newIDBoneArr.length * 3);
            for (var k = 0; k < newIDBoneArr.length; k++) {
                var $m = baseBone[newIDBoneArr[k]].clone();
                $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
                var $q = new Quaternion();
                $q.fromMatrix($m);
                var $p = $m.position;
                $tempDq.quat[k * 4 + 0] = $q.x;
                $tempDq.quat[k * 4 + 1] = $q.y;
                $tempDq.quat[k * 4 + 2] = $q.z;
                $tempDq.quat[k * 4 + 3] = $q.w;
                $tempDq.pos[k * 3 + 0] = $p.x;
                $tempDq.pos[k * 3 + 1] = $p.y;
                $tempDq.pos[k * 3 + 2] = $p.z;
            }
            return $tempDq;
        };
        Md5MoveSprite.prototype.loadTexture = function () {
        };
        Md5MoveSprite.prototype.upFrame = function () {
            if (this.md5MeshData && this.frameQuestArr && this.uvTextureRes) {
                this.updateMaterialMeshCopy();
            }
        };
        Md5MoveSprite.prototype.updateMaterialMeshCopy = function () {
            this.baseShder = this.md5shader;
            var context3D = this.scene3D.context3D;
            context3D.setProgram(this.baseShder.program);
            context3D.setVcMatrix4fv(this.baseShder, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
            context3D.setVa(0, 3, this.md5MeshData.vertexBuffer);
            context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
            context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
            context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);
            var t = Pan3d.TimeUtil.getTimer() - this.lastTm;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            this._actionTime += t;
            var _curentFrame = float2int(this._actionTime / (Scene3D.frameTime * 2));
            var $len = this.frameQuestArr.length;
            var $dualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len];
            context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos); //所有的位移
            context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);
        };
        return Md5MoveSprite;
    }(Display3DSprite));
    md5list.Md5MoveSprite = Md5MoveSprite;
})(md5list || (md5list = {}));
//# sourceMappingURL=Md5MoveSprite.js.map
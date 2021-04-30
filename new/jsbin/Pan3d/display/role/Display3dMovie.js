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
    var Display3dMovie = /** @class */ (function (_super) {
        __extends(Display3dMovie, _super);
        function Display3dMovie(val) {
            var _this = _super.call(this, val) || this;
            _this.meshVisible = true;
            _this._defaultAction = "stand";
            // protected _defaultAction: string = "m_attack_01";
            // protected _defaultAction: string = "walk";
            _this._curentFrame = 0;
            _this._actionTime = 0;
            _this.fileScale = 1;
            _this.time = 0;
            _this.dynamic = false;
            _this.completeState = 0;
            _this._animDic = new Object;
            _this._partDic = new Object;
            _this._partUrl = new Object;
            _this._preLoadActionDic = new Object;
            _this._waitLoadActionDic = new Object;
            return _this;
        }
        Display3dMovie.prototype.getSocket = function (socketName, resultMatrix) {
            resultMatrix.identity();
            if (!this._skinMesh) {
                resultMatrix.append(this.posMatrix);
                return;
            }
            else if (!this._skinMesh.boneSocketDic[socketName]) {
                if (socketName = "none") {
                    resultMatrix.appendTranslation(this.x, this.y, this.z);
                }
                else {
                    resultMatrix.append(this.posMatrix);
                }
                return;
            }
            var boneSocketData = this._skinMesh.boneSocketDic[socketName];
            var testmatix;
            var index = boneSocketData.index;
            testmatix = this.getFrameMatrix(index);
            resultMatrix.appendScale(1 / this.scaleX, 1 / this.scaleY, 1 / this.scaleZ);
            resultMatrix.appendRotation(boneSocketData.rotationX, Pan3d.Vector3D.X_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationY, Pan3d.Vector3D.Y_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationZ, Pan3d.Vector3D.Z_AXIS);
            resultMatrix.appendTranslation(boneSocketData.x, boneSocketData.y, boneSocketData.z);
            if (testmatix) {
                resultMatrix.append(this._skinMesh.meshAry[this._skinMesh.meshAry.length - 1].bindPosInvertMatrixAry[index]);
                resultMatrix.append(testmatix);
            }
            resultMatrix.append(this.posMatrix);
        };
        Display3dMovie.prototype.getFrameMatrix = function (index) {
            if (this._animDic[this.curentAction]) {
                var animData = this._animDic[this.curentAction];
                if (this._curentFrame >= animData.matrixAry.length) {
                    return animData.matrixAry[0][index];
                }
                return animData.matrixAry[this._curentFrame][index];
            }
            else if (this._animDic[this._defaultAction]) {
                var animData = this._animDic[this._defaultAction];
                return animData.matrixAry[this._curentFrame][index];
            }
            return null;
        };
        Display3dMovie.prototype.setRoleUrl = function (url) {
            var _this = this;
            this.scene3D.meshDataManager.getMeshData(url, function (value) {
                _this._skinMesh = value;
                _this.fileScale = value.fileScale;
                _this.updateMatrix();
                _this.addSkinMeshParticle();
                _this._animDic = value.animDic;
                _this.onMeshLoaded();
            });
        };
        Display3dMovie.prototype.updateMatrix = function () {
            _super.prototype.updateMatrix.call(this);
            this.posMatrix.appendScale(this.fileScale, this.fileScale, this.fileScale);
        };
        Display3dMovie.prototype.onMeshLoaded = function () {
        };
        Display3dMovie.prototype.addSkinMeshParticle = function () {
            if (!this._skinMesh) {
                return;
            }
            var dicAry = new Array;
            this._partDic["mesh"] = dicAry;
            var meshAry = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i = 0; i < meshAry.length; i++) {
                var particleAry = meshAry[i].particleAry;
                for (var j = 0; j < particleAry.length; j++) {
                    var bindPartcle = particleAry[j];
                    var particle;
                    particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    this.scene3D.particleManager.addParticle(particle);
                }
            }
        };
        Display3dMovie.prototype.upFrame = function () {
            if (!this._skinMesh) {
                return;
            }
            this.updateBind();
            if (this.meshVisible) {
                for (var i = 0; i < this._skinMesh.meshAry.length; i++) {
                    this.updateMaterialMesh(this._skinMesh.meshAry[i]);
                }
            }
        };
        Display3dMovie.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            //FpsMc.tipStr = "1" + $action + "," + this._curentAction;
            if (this.curentAction == $action) {
                return;
            }
            //FpsMc.tipStr = "2";
            this.curentAction = $action;
            this.completeState = $completeState;
            this._actionTime = 0;
            this.updateFrame(0);
            //FpsMc.tipStr = "3";
            if (this._animDic.hasOwnProperty($action)) {
                //FpsMc.tipStr = "4";
                return true;
            }
            else {
                //FpsMc.tipStr = "5";
                if (!this._waitLoadActionDic[$action] && this._preLoadActionDic[$action]) {
                    //FpsMc.tipStr = "6";
                    // this.setAnimUrl($action, this._preLoadActionDic[$action]);
                }
                return false;
            }
        };
        Display3dMovie.prototype.updateFrame = function (t) {
            this._actionTime += t;
            if (this._skinMesh == null) {
                return;
            }
            var animData = this._getCurentAnimData();
            if (animData == null) {
                return;
            }
            this._curentFrame = Math.floor(this._actionTime / (Pan3d.Scene3D.frameTime * 1.5));
            if (this._curentFrame >= animData.matrixAry.length) {
                if (this.completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                }
                else if (this.completeState == 1) {
                    this._curentFrame = animData.matrixAry.length - 1;
                }
                else if (this.completeState == 2) {
                    this._curentFrame = 0;
                    this.completeState = 0;
                    this.changeAction(this.curentAction);
                }
                else if (this.completeState == 3) {
                }
            }
        };
        Display3dMovie.prototype.changeAction = function (curentAction) {
            this.curentAction = this._defaultAction;
        };
        Display3dMovie.prototype._getCurentAnimData = function () {
            var animData = null;
            if (this._animDic[this.curentAction]) {
                animData = this._animDic[this.curentAction];
            }
            else if (this._animDic[this._defaultAction]) {
                animData = this._animDic[this._defaultAction];
            }
            return animData;
        };
        Display3dMovie.prototype.updateMaterialMesh = function (mesh) {
            if (!mesh.material) {
                return;
            }
            if (mesh.material.shader == null) {
                console.log("没有:");
                return;
            }
            this.shader3D = mesh.material.shader;
            var ctx = this.scene3D.context3D;
            ctx.setDepthTest(true);
            ctx.setWriteDepth(true);
            ctx.setProgram(this.shader3D.program);
            this.setVc();
            this.setMaterialTexture(mesh.material, mesh.materialParam);
            this.setMeshVc(mesh);
            this.setVaCompress(mesh);
            ctx.drawCall(mesh.indexBuffer, mesh.treNum);
        };
        Display3dMovie.prototype.setVc = function () {
            var ctx = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
        };
        Display3dMovie.prototype.setVaCompress = function ($mesh) {
            var ctx = this.scene3D.context3D;
            var tf = ctx.pushVa($mesh.vertexBuffer);
            if (tf) {
                return;
            }
            ctx.setVaOffset(0, 3, $mesh.stride, 0);
            ctx.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            ctx.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            ctx.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
        };
        Display3dMovie.prototype.setMeshVc = function ($mesh) {
            var ctx = this.scene3D.context3D;
            var animData;
            if (this._animDic[this.curentAction]) {
                animData = this._animDic[this.curentAction];
            }
            else if (this._animDic[this._defaultAction]) {
                animData = this._animDic[this._defaultAction];
            }
            else {
                return;
            }
            var $dualQuatFrame = animData.getBoneQPAryByMesh($mesh)[$mesh.uid][this._curentFrame];
            if (!$dualQuatFrame) {
                return;
            }
            ctx.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
            ctx.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos); //所有的位移
        };
        Display3dMovie.prototype.setMaterialTexture = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            //有重复需要优化
            var ctx = this.scene3D.context3D;
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].texture) {
                    ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
                    if ($mp.dynamicTexList[i].target) {
                        ctx.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
        };
        Display3dMovie.prototype.updateBind = function () {
            if (this.bindTarget) {
                this.posMatrix.identity();
                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
                if (this._isInGroup) {
                    this.posMatrix.append(this.groupMatrix);
                    //posMatrix.prependTranslation(groupPos.x, groupPos.y, groupPos.z);
                    //posMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                    //posMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                    //posMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
                    //posMatrix.prependScale(groupScale.x, groupScale.y, groupScale.z);
                }
                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
                this.posMatrix.append(this.bindMatrix);
                this.bindMatrix.copyTo(this.rotationMatrix);
                this.rotationMatrix.identityPostion();
                if (this._isInGroup) {
                    this.rotationMatrix.prepend(this.groupRotationMatrix);
                    //_rotationMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                    //_rotationMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                    //_rotationMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
                }
                this.sceneVisible = this.bindTarget.visible;
            }
        };
        return Display3dMovie;
    }(Pan3d.Display3DSprite));
    Pan3d.Display3dMovie = Display3dMovie;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3dMovie.js.map
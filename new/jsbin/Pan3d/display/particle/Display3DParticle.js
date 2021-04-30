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
    var Display3DParticle = /** @class */ (function (_super) {
        __extends(Display3DParticle, _super);
        function Display3DParticle(value) {
            var _this = _super.call(this, value) || this;
            _this.isInGroup = false;
            _this.visible = true;
            _this._rotationMatrix = new Pan3d.Matrix3D();
            _this.modelMatrix = new Pan3d.Matrix3D();
            return _this;
        }
        Display3DParticle.prototype.onCreated = function () {
        };
        Display3DParticle.prototype.setBind = function ($pos, $rotation, $scale, $invertRotation, $groupMatrix) {
            this.bindVecter3d = $pos;
            this.bindMatrix = $rotation;
            this.bindScale = $scale;
            this.invertBindMatrix = $invertRotation;
            this.groupMatrix = $groupMatrix;
        };
        Display3DParticle.prototype.setViewCamModeMatr3d = function () {
            var ctx = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix", this.scene3D.camera3D.viewMatrix.m);
            ctx.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix", this.scene3D.camera3D.camMatrix3D.m);
            ctx.setVcMatrix4fv(this.data.materialParam.shader, "modeMatrix", this.modelMatrix.m);
        };
        Display3DParticle.prototype.getMulBindList = function () {
            return null;
        };
        Display3DParticle.prototype.updateMatrix = function () {
            if (!this.bindMatrix) {
                return;
            }
            this.modelMatrix.identity();
            if (!this.groupMatrix.isIdentity) {
                this.posMatrix.append(this.groupMatrix);
            }
            this.modelMatrix.append(this.posMatrix);
            this.modelMatrix.append(this.bindMatrix);
            this.modelMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);
        };
        Object.defineProperty(Display3DParticle.prototype, "cantUseEffectsLev", {
            //特效配置等级显示  是否能显示
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Display3DParticle.prototype.updateTime = function (t) {
            if (this.cantUseEffectsLev) {
                return;
            }
            this._time = t - this._beginTime;
            this._time += this.data._delayedTime; //加上延时 
            this.timeline.updateTime(t);
            this.visible = this.timeline.visible;
            this.posMatrix.identity();
            this.posMatrix.prependScale(this.scaleX * 0.1 * this.bindScale.x * this.data.overAllScale, this.scaleY * 0.1 * this.bindScale.y * this.data.overAllScale, this.scaleZ * 0.1 * this.bindScale.z * this.data.overAllScale);
            this.timeline.updateMatrix(this.posMatrix, this);
        };
        Display3DParticle.prototype.reset = function () {
            this.timeline.reset();
            this.updateTime(0);
        };
        Display3DParticle.prototype.update = function () {
            {
                if (this.visible && this.data != null && this.scene3D != null) {
                    if (this.data.materialParam != null && this.data.materialParam.shader != null) {
                        this.shader = this.data.materialParam.shader;
                        var ctx = this.scene3D.context3D;
                        ctx.setProgram(this.shader.program);
                        ctx.setBlendParticleFactors(this.data._alphaMode);
                        // ctx.cullFaceBack(this.data.materialParam.material.backCull);
                        this.updateMatrix();
                        this.setMaterialVc();
                        this.setMaterialTexture();
                        this.setVc();
                        this.setVa();
                        this.resetVa();
                    }
                }
            }
        };
        Display3DParticle.prototype.setVc = function () {
        };
        Display3DParticle.prototype.setVa = function () {
        };
        Display3DParticle.prototype.resetVa = function () {
        };
        Display3DParticle.prototype.setMaterialVc = function () {
            if (!this.data.materialParam) {
                return;
            }
            var dynamicConstList = this.data.materialParam.dynamicConstList;
            var t = this._time % (Pan3d.Scene3D.frameTime * this.data._life);
            for (var i = 0; i < dynamicConstList.length; i++) {
                dynamicConstList[i].update(t);
            }
            if (this.data.materialParam.material.fcNum <= 0) {
                return;
            }
            t = t * this.data.materialParam.material.timeSpeed;
            this.data.materialParam.material.update(t);
            var ctx = this.scene3D.context3D;
            ctx.setVc4fv(this.data.materialParam.shader, "fc", this.data.materialParam.material.fcData);
        };
        Display3DParticle.prototype.setMaterialTexture = function () {
            if (!this.data.materialParam) {
                return;
            }
            var ctx = this.scene3D.context3D;
            var texVec = this.data.materialParam.material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].isDynamic) {
                    continue;
                }
                ctx.setRenderTexture(this.data.materialParam.shader, texVec[i].name, texVec[i].texture, texVec[i].id, true);
            }
            var texDynamicVec = this.data.materialParam.dynamicTexList;
            for (var i = 0; i < texDynamicVec.length; i++) {
                ctx.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id, true);
            }
        };
        Display3DParticle.prototype.setAllByteInfo = function ($byte, version) {
            if (version === void 0) { version = 0; }
            this.creatData();
            this.data.version = version;
            this.data.setAllByteInfo($byte);
            this.timeline = new Pan3d.TimeLine();
            this.timeline.setAllDataInfo(this.data.timelineData);
            this._beginTime = this.timeline.beginTime;
        };
        Display3DParticle.prototype.creatData = function () {
            this.data = new Pan3d.ParticleData(this.scene3D);
        };
        Display3DParticle.prototype.setTimeLine = function ($tl) {
            this.timeline = $tl;
            this._beginTime = $tl.beginTime;
        };
        return Display3DParticle;
    }(Pan3d.Display3D));
    Pan3d.Display3DParticle = Display3DParticle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DParticle.js.map
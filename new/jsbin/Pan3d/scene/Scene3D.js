var Pan3d;
(function (Pan3d) {
    var Scene3D = /** @class */ (function () {
        function Scene3D(value) {
            this.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
            this.fogColor = [0, 0, 0];
            this.fogData = [1000, 0.003];
            this.scaleLight = [2.0];
            this.time = 0;
            this.supportBlob = true;
            this.context3D = new Pan3d.Context3D(value);
            this.camera3D = new Pan3d.Camera3D();
            this.progrmaManager = new Pan3d.ProgrmaManager(this);
            this.objDataManager = new Pan3d.ObjDataManager(this);
            this.textureManager = new Pan3d.TextureManager(this);
            this.materialManager = new Pan3d.MaterialManager(this);
            this.groupDataManager = new Pan3d.GroupDataManager(this);
            this.resManager = new Pan3d.ResManager(this);
            this.animManager = new Pan3d.AnimManager(this);
            this.meshDataManager = new Pan3d.MeshDataManager(this);
            this.particleManager = new Pan3d.ParticleManager(this);
            this.skillManager = new Pan3d.SkillManager(this);
            this._displayList = new Array();
            this._displayRoleList = new Array();
            this.initPbr();
            this.addDisplay(new Pan3d.GridLineSprite(this));
            // this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
        }
        Scene3D.getArrByStr = function (str) {
            var boneNameAry = str.split(/\s+/g);
            for (var i = boneNameAry.length - 1; i >= 0; i--) {
                if (String(boneNameAry[i]).length < 1) {
                    boneNameAry.splice(i, 1);
                }
            }
            return boneNameAry;
        };
        Object.defineProperty(Scene3D.prototype, "cam3D", {
            get: function () {
                return this.camera3D;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Scene3D.prototype, "viewMatrx3D", {
            get: function () {
                return this.cam3D.cameraMatrix;
            },
            enumerable: false,
            configurable: true
        });
        Scene3D.prototype.initPbr = function () {
            var _this = this;
            if (!this.pubLut) {
                this.textureManager.getTexture(this.fileRoot + "base/brdf_ltu.jpg", function ($texture) {
                    _this.pubLut = $texture.texture;
                }, 1);
            }
            if (!this.skyCubeMap) {
                this.textureManager.loadCubeTexture(this.fileRoot + "base/cube/e", function ($ary) {
                    _this.skyCubeMap = $ary;
                });
            }
        };
        Scene3D.prototype.clearAll = function () {
            this._displayList = new Array();
            this._displayRoleList = new Array();
            this.particleManager.clearAll();
        };
        Scene3D.prototype.addDisplay = function (itemDisplay) {
            this._displayList.push(itemDisplay);
        };
        Scene3D.prototype.addMovieDisplay = function (role) {
            this._displayRoleList.push(role);
        };
        Scene3D.prototype.upFrame = function () {
            this.camera3D.upFrame();
            this.updateFrameRole();
            // this.camera3D.rotationY++;
            this.context3D.setBaseRender();
            this.context3D.setWriteDepth(true);
            this.context3D.setBlendParticleFactors(0);
            for (var i = 0; i < this._displayList.length; i++) {
                this._displayList[i].upFrame();
            }
            for (var i = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].upFrame();
            }
            this.skillManager.update();
            this.particleManager.upFrame();
            this.displayBaseSprite ? this.displayBaseSprite.upFrame() : null;
        };
        Scene3D.prototype.updateFrameRole = function () {
            var _tempTime = Pan3d.TimeUtil.getTimer();
            var delay = _tempTime - this.time;
            this.time = _tempTime;
            for (var i = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].updateFrame(delay);
            }
        };
        Scene3D.frameTime = 1000 / 60;
        Scene3D.MAX_NUMBER = 10000000;
        return Scene3D;
    }());
    Pan3d.Scene3D = Scene3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Scene3D.js.map
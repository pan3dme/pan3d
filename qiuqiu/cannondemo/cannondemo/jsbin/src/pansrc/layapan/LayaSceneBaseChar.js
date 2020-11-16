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
/**
* name
*/
var layapan;
(function (layapan) {
    var CombineParticle = Pan3d.CombineParticle;
    var Scene_data = Pan3d.Scene_data;
    var ParticleManager = Pan3d.ParticleManager;
    var Vector3D = Pan3d.Vector3D;
    var BaseRes = Pan3d.BaseRes;
    var Display3DSprite = Pan3d.Display3DSprite;
    var ShadowManager = Pan3d.ShadowManager;
    var LayaSceneBaseChar = /** @class */ (function (_super) {
        __extends(LayaSceneBaseChar, _super);
        function LayaSceneBaseChar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._avatar = -1;
            _this._visible = true;
            return _this;
        }
        Object.defineProperty(LayaSceneBaseChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: false,
            configurable: true
        });
        LayaSceneBaseChar.prototype.setAvatar = function (num) {
            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));
        };
        LayaSceneBaseChar.prototype.update = function () {
            if (this.visible) {
                _super.prototype.update.call(this);
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        };
        LayaSceneBaseChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $url = getRoleUrl(String(num));
            return getRoleUrl(String(num));
        };
        LayaSceneBaseChar.prototype.getSceneCharWeaponUrl = function (num, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            return getModelUrl(String(num + $suffix));
        };
        // 是否播放中
        LayaSceneBaseChar.prototype.isPlaying = function () {
            // if(this._completeState != 1){
            // 	return true;
            // }
            return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        };
        LayaSceneBaseChar.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
            if (this._hasDestory) {
                return;
            }
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d;
                var rotationV3d;
                var scaleV3d;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    this._scene.particleManager.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
                else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
            }
            this.applyVisible();
        };
        LayaSceneBaseChar.prototype.removeStage = function () {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary = this._partDic[key];
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        this._scene.particleManager.removeParticle(ary[i]);
                    }
                    else if (ary[i] instanceof Display3DSprite) {
                        this._scene.removeSpriteDisplay(ary[i]);
                    }
                }
            }
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "px", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "py", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "pz", {
            get: function () {
                return this.z;
            },
            set: function (value) {
                this.z = value;
            },
            enumerable: false,
            configurable: true
        });
        LayaSceneBaseChar.prototype.addSkinMeshParticle = function () {
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
                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    this._scene.particleManager.addParticle(particle);
                }
            }
        };
        return LayaSceneBaseChar;
    }(Pan3d.Display3dMovie));
    layapan.LayaSceneBaseChar = LayaSceneBaseChar;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaSceneBaseChar.js.map
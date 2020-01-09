var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var base;
        (function (base) {
            var UIBackImg = (function (_super) {
                __extends(UIBackImg, _super);
                function UIBackImg() {
                    var _this = _super.call(this) || this;
                    _this._scaleData = [1, 1];
                    _this._isFBO = false;
                    _this.alpha = 1.0;
                    return _this;
                }
                UIBackImg.prototype.initData = function () {
                    this.objData = new ObjData();
                    this.shader = ProgrmaManager.getInstance().getProgram(UIImageShader.UI_IMG_SHADER);
                    this.program = this.shader.program;
                    this.objData.vertices.push(-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0);
                    this.objData.uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
                    this.objData.indexs.push(0, 1, 2, 0, 2, 3);
                    this.objData.treNum = 6;
                    this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                    this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                    this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
                };
                UIBackImg.prototype.resize = function () {
                    this.appleyPos();
                };
                UIBackImg.prototype.setImgInfo = function ($url, $width, $height) {
                    this.setImgUrl($url);
                    this._width = $width;
                    this._height = $height;
                };
                UIBackImg.prototype.appleyPos = function () {
                    var widthScale = this._width / Scene_data.stageWidth;
                    var heightScale = this._height / Scene_data.stageHeight;
                    if (widthScale < heightScale) {
                        this._scaleData[0] = 1;
                        this._scaleData[1] = (this._height / Scene_data.stageHeight) / widthScale;
                    }
                    else {
                        this._scaleData[0] = (this._width / Scene_data.stageWidth) / heightScale;
                        this._scaleData[1] = 1;
                    }
                };
                UIBackImg.prototype.setFbo = function () {
                    this._isFBO = true;
                };
                UIBackImg.prototype.update = function () {
                    var hasTexture = false;
                    if (this._isFBO) {
                        if (Scene_data.fbo) {
                            hasTexture = true;
                        }
                        Scene_data.context3D.clearContext();
                        Scene_data.context3D.setDepthTest(false);
                    }
                    else {
                        if (this.texture) {
                            hasTexture = true;
                        }
                    }
                    if (this.objData && hasTexture) {
                        Scene_data.context3D.setBlendParticleFactors(0);
                        Scene_data.context3D.setProgram(this.program);
                        Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                        Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                        Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);
                        if (this._isFBO) {
                            Scene_data.context3D.setVc2fv(this.shader, "scale", [1, -1]);
                            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", Scene_data.fbo.texture, 0);
                        }
                        else {
                            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
                        }
                        Scene_data.context3D.setVcFloat(this.shader, "alpha", [this.alpha]);
                        Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
                    }
                };
                UIBackImg.prototype.interactiveEvent = function ($e) {
                    return true;
                };
                return UIBackImg;
            }(engine.ui.base.UIRenderComponent));
            base.UIBackImg = UIBackImg;
            var UIRenderOnlyPicComponent = (function (_super) {
                __extends(UIRenderOnlyPicComponent, _super);
                function UIRenderOnlyPicComponent() {
                    return _super.call(this) || this;
                }
                UIRenderOnlyPicComponent.prototype.makeRenderDataVc = function ($vcId) {
                    _super.prototype.makeRenderDataVc.call(this, $vcId);
                    for (var i = 0; i < this.renderData2.length / 4; i++) {
                        this.renderData2[i * 4 + 0] = 1;
                        this.renderData2[i * 4 + 1] = 1;
                        this.renderData2[i * 4 + 2] = 0;
                        this.renderData2[i * 4 + 3] = 0;
                    }
                };
                UIRenderOnlyPicComponent.prototype.update = function () {
                    if (this.texture) {
                        _super.prototype.update.call(this);
                    }
                };
                UIRenderOnlyPicComponent.prototype.setTextureToGpu = function () {
                    Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
                };
                /*
                   var _bigPic: UIRenderOnlyPicComponent = new UIRenderOnlyPicComponent();
                        this.addRender(_bigPic);
                        _bigPic.uiAtlas = this._midRender.uiAtlas;
                        _bigPic.setImgUrl("ui/uidata/basebg/skillbg.png");
                        this.addChild(_bigPic.getComponent("ccav"));
            
                */
                UIRenderOnlyPicComponent.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    if (this.textureRes) {
                        this.textureRes.clearUseNum();
                    }
                };
                return UIRenderOnlyPicComponent;
            }(engine.ui.base.UIRenderComponent));
            base.UIRenderOnlyPicComponent = UIRenderOnlyPicComponent;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UIBackImg.js.map
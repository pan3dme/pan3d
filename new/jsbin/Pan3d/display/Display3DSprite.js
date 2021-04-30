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
    var Display3DSprite = /** @class */ (function (_super) {
        __extends(Display3DSprite, _super);
        function Display3DSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.dynamic = false;
            _this.time = 0;
            _this.initData();
            _this.rotationMatrix = new Pan3d.Matrix3D();
            return _this;
        }
        Display3DSprite.prototype.setPicUrl = function (url) {
            // throw new Error("Method not implemented.");
        };
        Display3DSprite.prototype.initData = function () {
        };
        Display3DSprite.prototype.setObjUrl = function (value) {
            var _this = this;
            this.scene3D.objDataManager.getObjData(this.scene3D.fileRoot + value, function ($obj) {
                _this.objData = $obj;
            });
        };
        Display3DSprite.prototype.setLighturl = function (value) {
            var _this = this;
            this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + value, function (textureRes) {
                _this.lightTextureRes = textureRes;
            });
        };
        Display3DSprite.prototype.setMaterialUrl = function (value, $paramData) {
            var _this = this;
            if ($paramData === void 0) { $paramData = null; }
            value = value.replace("_byte.txt", ".txt");
            value = value.replace(".txt", "_byte.txt");
            this.scene3D.materialManager.getMaterialByte(this.scene3D.fileRoot + value, function ($material) {
                _this.material = $material;
                if ($paramData) {
                    _this.materialParam = new Pan3d.MaterialBaseParam(_this.scene3D);
                    _this.materialParam.setData(_this.material, $paramData);
                }
                if (_this.material.usePbr || _this.material.directLight) {
                    _this._rotationData = new Float32Array(9);
                }
            }, null, true, Pan3d.MaterialShader.MATERIAL_SHADER, Pan3d.MaterialShader);
        };
        Display3DSprite.prototype.upFrame = function () {
            this.updateMatrix();
            if (this.objData && this.objData.indexBuffer && this.material) {
                var ctx = this.scene3D.context3D;
                this.shader3D = this.material.shader;
                ctx.setProgram(this.shader3D.program);
                this.updateBind();
                this.setMaterialVa();
                this.setMaterialTexture(this.material, this.materialParam);
                this.setMaterialVc(this.material, this.materialParam);
                this.setVc();
                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        Display3DSprite.prototype.updateBind = function () {
            if (this.bindTarget) {
                this.posMatrix.identity();
                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
                this.posMatrix.append(this.bindMatrix);
            }
        };
        Display3DSprite.prototype.setVc = function () {
            var ctx = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
            if (this.material.usePbr || this.material.directLight) {
                ctx.setVcMatrix3fv(this.material.shader, "rotationMatrix3D", this._rotationData);
            }
        };
        Display3DSprite.prototype.setMaterialVc = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            if ($material.fcNum <= 0) {
                return;
            }
            var t = 0;
            if ($material.hasTime) {
                t = (Pan3d.TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            var ctx = this.scene3D.context3D;
            ctx.setVc4fv($material.shader, "fc", $material.fcData);
        };
        Display3DSprite.prototype.setBind = function ($bindTarget, $bindSocket) {
            this.bindTarget = $bindTarget;
            this.bindSocket = $bindSocket;
            this.bindMatrix = new Pan3d.Matrix3D();
        };
        Display3DSprite.prototype.setMaterialTexture = function ($material, $mp) {
            var ctx = this.scene3D.context3D;
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].type == Pan3d.TexItem.LIGHTMAP) {
                    if (this.lightTextureRes) {
                        ctx.setRenderTexture($material.shader, texVec[i].name, this.lightTextureRes.texture, texVec[i].id);
                    }
                }
                else if (texVec[i].type == Pan3d.TexItem.CUBEMAP) {
                    if ($material.useDynamicIBL) { // && _reflectionTextureVo) {
                        //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
                    }
                    else {
                        var index = Math.floor($material.roughness * 5);
                        if (this.scene3D.skyCubeMap) {
                            var cubeTexture = this.scene3D.skyCubeMap[index];
                            ctx.setRenderTextureCube($material.shader.program, texVec[i].name, cubeTexture, texVec[i].id);
                        }
                    }
                }
                else {
                    if (texVec[i].texture) {
                        ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
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
        Display3DSprite.prototype.setMaterialVa = function () {
            var ctx = this.scene3D.context3D;
            if (ctx.pushVa(this.objData.vertexBuffer)) {
                return;
            }
            ctx.setVaOffset(0, 3, this.objData.stride, 0);
            ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
            if (!(this.material.directLight || this.material.noLight)) {
                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
            }
        };
        return Display3DSprite;
    }(Pan3d.Display3D));
    Pan3d.Display3DSprite = Display3DSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DSprite.js.map
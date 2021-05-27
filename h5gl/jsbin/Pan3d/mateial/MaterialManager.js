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
    var MaterialManager = /** @class */ (function (_super) {
        __extends(MaterialManager, _super);
        function MaterialManager(value) {
            var _this = 
            //this.dic = new Object();
            _super.call(this, value) || this;
            _this._loadDic = new Object();
            _this._resDic = new Object();
            _this._regDic = new Object();
            return _this;
        }
        MaterialManager.prototype.getMaterialByte = function ($url, $fun, $info, $autoReg, $regName, $shader3DCls) {
            var _this = this;
            if ($info === void 0) { $info = null; }
            if ($autoReg === void 0) { $autoReg = false; }
            if ($regName === void 0) { $regName = null; }
            if ($shader3DCls === void 0) { $shader3DCls = null; }
            if (this.dic[$url]) {
                if ($info) {
                    $fun(this.dic[$url], $info);
                }
                else {
                    $fun(this.dic[$url]);
                }
                this.dic[$url].useNum++;
                return;
            }
            var materialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3DCls);
            if (this._loadDic[$url]) {
                var ary = this._loadDic[$url];
                ary.push(materialLoad);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(materialLoad);
            if (this._resDic[$url]) {
                this.meshByteMaterialByt(this._resDic[$url], materialLoad);
                if (this._regDic[$url]) {
                    this.dic[$url].useNum += this._regDic[$url];
                    delete this._regDic[$url];
                }
                delete this._resDic[$url];
            }
            else {
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($data, _info) {
                    _this.loadMaterialByteCom($data, _info);
                }, materialLoad);
            }
        };
        MaterialManager.prototype.meshByteMaterialByt = function (byte, _info) {
            var material = new Pan3d.Material(this.scene3D);
            material.setByteData(byte);
            material.url = _info.url;
            this.loadMaterial(material);
            if (_info.autoReg) {
                material.shader = this.scene3D.progrmaManager.getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
            }
            var ary = this._loadDic[_info.url];
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                }
                else {
                    ary[i].fun(material);
                }
            }
            delete this._loadDic[_info.url];
            this.dic[_info.url] = material;
        };
        MaterialManager.prototype.loadMaterialByteCom = function ($data, _info) {
            var byte = new Pan3d.Pan3dByteArray($data);
            this.meshByteMaterialByt(byte, _info);
        };
        MaterialManager.prototype.addResByte = function ($url, $data) {
            if (!this.dic[$url] && !this._resDic[$url]) {
                this._resDic[$url] = $data;
            }
        };
        MaterialManager.prototype.registerUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this.dic[$url]) {
                this.dic[$url].useNum++;
            }
            else {
                if (this._regDic[$url]) {
                    this._regDic[$url]++;
                }
                else {
                    this._regDic[$url] == 1;
                }
            }
        };
        MaterialManager.prototype.releaseUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (this.dic[$url]) {
                this.dic[$url].clearUseNum();
            }
        };
        /**
        public loadMaterialCom($data: string, _info: MaterialLoad): void {
            var obj = JSON.parse($data);
            
            var material: Material = new Material();
            material.setCompileData(obj);
            material.url = _info.url;
    
            this.loadMaterial(material);
    
            if (_info.autoReg){
                material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
            }
    
            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                } else {
                    ary[i].fun(material);
                }
            }
            
            delete this._loadDic[_info.url];
    
            this.dic[_info.url] = material;
    
        }
        */
        MaterialManager.prototype.loadMaterial = function ($material) {
            var texVec = $material.texList;
            for (var i = 0; i < texVec.length; i++) {
                if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
                    continue;
                }
                this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + texVec[i].url, function ($textureVo, $texItem) {
                    $texItem.textureRes = $textureVo;
                }, texVec[i].wrap, texVec[i], texVec[i].filter, texVec[i].mipmap);
            }
        };
        MaterialManager.prototype.loadDynamicTexUtil = function (material) {
            var dynamicTexList = material.dynamicTexList;
            for (var i = 0; i < dynamicTexList.length; i++) {
                if (dynamicTexList[i].isParticleColor) {
                    dynamicTexList[i].creatTextureByCurve();
                }
                else {
                    this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + dynamicTexList[i].url, function ($textureVo, $texItem) {
                        $texItem.textureRes = $textureVo;
                    }, 0, dynamicTexList[i], 0, 1);
                }
            }
        };
        return MaterialManager;
    }(Pan3d.ResGC));
    Pan3d.MaterialManager = MaterialManager;
    var MaterialLoad = /** @class */ (function () {
        function MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D) {
            this.fun = $fun;
            this.info = $info;
            this.url = $url;
            this.autoReg = $autoReg;
            this.regName = $regName;
            this.shader3D = $shader3D;
        }
        return MaterialLoad;
    }());
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MaterialManager.js.map
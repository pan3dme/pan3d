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
    var TextureManager = /** @class */ (function (_super) {
        __extends(TextureManager, _super);
        function TextureManager(value) {
            var _this = _super.call(this, value) || this;
            _this._loadDic = new Object();
            _this._resDic = new Object();
            return _this;
        }
        TextureManager.prototype.getTexture = function ($url, $fun, $wrapType, $info, $filteType, $mipmapType) {
            var _this = this;
            if ($wrapType === void 0) { $wrapType = 0; }
            if ($info === void 0) { $info = null; }
            if ($filteType === void 0) { $filteType = 0; }
            if ($mipmapType === void 0) { $mipmapType = 0; }
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
            var textureLoad = new Pan3d.TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
            if (this._loadDic[$url]) {
                var ary = this._loadDic[$url];
                ary.push(textureLoad);
                return;
            }
            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(textureLoad);
            if (this._resDic[$url]) {
                this.loadTextureCom(this._resDic[$url], textureLoad);
                delete this._resDic[$url];
            }
            else {
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE, function ($img, _info) {
                    _this.loadTextureCom($img, _info);
                }, textureLoad);
            }
        };
        TextureManager.prototype.addRes = function ($url, $img) {
            if (!this.dic[$url] && !this._resDic[$url]) {
                this._resDic[$url] = $img;
            }
        };
        TextureManager.prototype.loadTextureCom = function ($img, _info) {
            var context3D = this.scene3D.context3D;
            var texture = context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);
            var textres = new Pan3d.TextureRes(this.scene3D);
            textres.texture = texture;
            textres.width = $img.width;
            textres.height = $img.height;
            var ary = this._loadDic[_info.url];
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(textres, ary[i].info);
                }
                else {
                    ary[i].fun(textres);
                }
            }
            delete this._loadDic[_info.url];
            this.dic[_info.url] = textres;
        };
        TextureManager.prototype.loadCubeTexture = function ($url, $fun) {
            var cubeMapLoad = new Pan3d.CubemapLoad();
            cubeMapLoad.loadCube($url, function ($cubeList) { $fun($cubeList); }, this.scene3D);
        };
        return TextureManager;
    }(Pan3d.ResGC));
    Pan3d.TextureManager = TextureManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TextureManager.js.map
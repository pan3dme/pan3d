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
    var ObjDataManager = /** @class */ (function (_super) {
        __extends(ObjDataManager, _super);
        function ObjDataManager(value) {
            var _this = _super.call(this, value) || this;
            _this._loadList = new Object();
            return _this;
        }
        ObjDataManager.prototype.getObjData = function ($url, $fun) {
            var _this = this;
            if (this.dic[$url]) {
                $fun(this.dic[$url]);
                this.dic[$url].useNum++;
                return;
            }
            var ary;
            if (!this._loadList[$url]) {
                this._loadList[$url] = new Array;
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                    _this.loadObjCom($byte, $url);
                });
            }
            ary = this._loadList[$url];
            ary.push($fun);
        };
        ObjDataManager.prototype.loadObjCom = function ($byte, $url) {
            if (this.dic[$url]) {
                return;
            }
            var $objData = new Pan3d.ObjData(this.scene3D);
            var byte = new Pan3d.Pan3dByteArray($byte);
            var version = byte.readInt();
            var str = byte.readUTF();
            this.readObj2OneBuffer(byte, $objData);
            $objData.treNum = $objData.indexs.length;
            $objData.indexBuffer = this.scene3D.context3D.uploadIndexBuff3D($objData.indexs);
            this.dic[$url] = $objData;
            var ary = this._loadList[$url];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    ary[i]($objData);
                }
                delete this._loadList[$url];
            }
            return $objData;
        };
        ObjDataManager.prototype.readObj2OneBuffer = function (byte, $objData) {
            var typeItem = new Array;
            var len;
            var typeItem = new Array;
            var dataWidth = 0;
            for (var i = 0; i < 6; i++) {
                var tf = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    switch (i) {
                        case 1: //uv
                            dataWidth += 2;
                            break;
                        case 2: //lightuv
                            dataWidth += 2;
                            break;
                        default:
                            dataWidth += 3;
                            break;
                    }
                }
            }
            len = byte.readFloat();
            var baseLenght = len;
            len *= dataWidth * 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            var uvsOffsets = 3;
            var lightuvsOffsets = uvsOffsets + 2;
            var normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
            var tangentsOffsets = normalsOffsets + 3;
            var bitangentsOffsets = tangentsOffsets + 3;
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1); //lightuvs
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
            Pan3d.BaseRes.readIntForTwoByte(byte, $objData.indexs);
            $objData.vertexBuffer = this.scene3D.context3D.uploadBuff3DArrayBuffer(arybuff);
            $objData.compressBuffer = true;
            $objData.uvsOffsets = uvsOffsets * 4;
            $objData.lightuvsOffsets = lightuvsOffsets * 4;
            $objData.normalsOffsets = normalsOffsets * 4;
            $objData.tangentsOffsets = tangentsOffsets * 4;
            $objData.bitangentsOffsets = bitangentsOffsets * 4;
            $objData.stride = dataWidth * 4;
        };
        ObjDataManager.prototype.registerUrl = function ($url) {
            if (this.dic[$url]) {
                this.dic[$url].useNum++;
            }
        };
        return ObjDataManager;
    }(Pan3d.ResGC));
    Pan3d.ObjDataManager = ObjDataManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ObjDataManager.js.map
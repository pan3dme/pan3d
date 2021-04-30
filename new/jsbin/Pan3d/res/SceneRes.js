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
    var SceneRes = /** @class */ (function (_super) {
        __extends(SceneRes, _super);
        function SceneRes(value) {
            return _super.call(this, value) || this;
        }
        SceneRes.prototype.load = function ($url, $completeFun, $progressFun, $readDataFun) {
            var _this = this;
            this._completeFun = $completeFun;
            this._readDataFun = $readDataFun;
            this._progressFun = $progressFun;
            $url = this.scene3D.fileRoot + getMapUrl($url);
            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            }, null, $progressFun);
        };
        SceneRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            this.read(function () { _this.readNext(); }); //img
        };
        SceneRes.prototype.readNext = function () {
            this.read(); //obj
            this.read(); //material
            this.read(); //particle;
            this.readScene();
            this._completeFun();
        };
        SceneRes.prototype.readScene = function () {
            var types = this._byte.readInt();
            this.readAstat();
            if (this.version >= 28) {
                this.readTerrainIdInfoBitmapData(this._byte);
            }
            var size = this._byte.readInt();
            this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
        };
        SceneRes.prototype.readAstat = function () {
            var hasAstat = this._byte.readBoolean();
            if (hasAstat) {
                this._byte.readFloat();
                this._byte.readFloat();
                this._byte.readFloat();
                this._byte.readFloat();
                var i;
                var j;
                var tw = this._byte.readInt();
                var th = this._byte.readInt();
                // this._astarDataMesh.width = tw;
                // this._astarDataMesh.height = th;
                if (this.version < 25) {
                    for (i = 0; i < th; i++) {
                        var tempAstar = new Array;
                        for (j = 0; j < tw; j++) {
                            tempAstar.push(this._byte.readFloat());
                        }
                        // this._astarDataMesh.astarItem.push(tempAstar);
                    }
                    for (i = 0; i < th; i++) {
                        var tempHeightArr = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readFloat());
                        }
                        // this._astarDataMesh.heightItem.push(tempHeightArr);
                    }
                }
                else {
                    var $heightScaleNum = this._byte.readFloat();
                    var $astrBase = this.readAstarFromByte(this._byte);
                    var $jumpBase = this.readAstarFromByte(this._byte);
                    var $astrBaseId = 0;
                    var $jumpBaseId = 0;
                    for (i = 0; i < th; i++) {
                        var tempAstar = new Array;
                        var tempJump = new Array;
                        for (j = 0; j < tw; j++) {
                            var astarNum = $astrBase[$astrBaseId++];
                            tempAstar.push(astarNum);
                            if (astarNum == 1) {
                                var ssss = $jumpBase[$jumpBaseId++];
                                tempJump.push(ssss);
                            }
                            else {
                                tempJump.push(0);
                            }
                        }
                    }
                    for (i = 0; i < th; i++) {
                        var tempHeightArr = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readShort() / $heightScaleNum);
                        }
                    }
                }
            }
        };
        SceneRes.prototype.readTerrainIdInfoBitmapData = function ($byte) {
            var $len = $byte.readInt();
            if ($len) {
                //var newByte: ByteArray = new ByteArray();
                //newByte.length = $len;
                //$byte.readBytes(newByte, 0, $len);
                var zipLen = $len;
                var aryBuf = $byte.buffer.slice($byte.position, $byte.position + zipLen);
                $byte.position += zipLen;
                var zipedBuf = unZip(aryBuf);
                var newByte = new Pan3d.Pan3dByteArray(zipedBuf);
            }
        };
        SceneRes.prototype.readAstarFromByte = function ($byte) {
            var $len = $byte.readUnsignedInt();
            var $intLen = Math.ceil($len / 32);
            var $astrBase = new Array;
            for (var i = 0; i < $intLen; i++) {
                var $num = $byte.readUnsignedInt();
                for (var j = 0; j < 32; j++) {
                    var $ast = $num & 1;
                    if ($astrBase.length < $len) {
                        $astrBase.push($ast);
                    }
                    $num >>= 1;
                }
            }
            return $astrBase;
        };
        return SceneRes;
    }(Pan3d.BaseRes));
    Pan3d.SceneRes = SceneRes;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SceneRes.js.map
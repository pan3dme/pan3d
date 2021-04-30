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
    var Frame3dRes = /** @class */ (function (_super) {
        __extends(Frame3dRes, _super);
        function Frame3dRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Frame3dRes.prototype.load = function ($url, $completeFun) {
            var _this = this;
            this._completeFun = $completeFun;
            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                _this.loadComplete($byte);
            }, null);
        };
        Frame3dRes.prototype.loadComplete = function ($byte) {
            var _this = this;
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            if (this.version >= 31) {
            }
            var $str = this._byte.readUTF();
            var $itemstr = $str.split("/");
            Frame3dRes.sceneFileroot = $str.replace($itemstr[$itemstr.length - 1], "");
            Frame3dRes.fileName = $itemstr[$itemstr.length - 1];
            Frame3dRes.frameSpeedNum = this._byte.readInt();
            console.log("版本", this.version, "frameSpeedNum", Frame3dRes.frameSpeedNum);
            this.readSceneInfo();
            this.read(function () { _this.readNext(); }); //img
        };
        Frame3dRes.prototype.toVect4 = function ($num) {
            var temp = Math.floor(65536 * $num);
            var a = Math.floor(temp / 256);
            var b = Math.floor(temp - a * 256);
            return new Pan3d.Vector3D(a / 256, b / 256, 0, 1);
        };
        Frame3dRes.prototype.toNum = function (vect) {
            var $a = vect.x * 256;
            var $b = vect.y * 256;
            var $bnum = ($a * 256 + $b) / 65536;
            console.log("$bnum", $bnum);
            return ($a * 256 + $b) / 65536;
        };
        //收获环境参数
        Frame3dRes.prototype.readSceneInfo = function () {
            var size = this._byte.readInt();
            var $obj = JSON.parse(this._byte.readUTFBytes(size));
            this.haveVideo = $obj.haveVideo;
            // Scene_data.light.setData($obj.SunNrm, $obj.SunLigth, $obj.AmbientLight);
            // LightBmpModel.getInstance().videoLightUvData = $obj.videoLightUvData;
        };
        Frame3dRes.prototype.readNext = function () {
            this.read(); //obj
            this.read(); //material
            this.read(); //particle;
            this.readFrame3dScene();
        };
        Frame3dRes.prototype.readFrame3dScene = function () {
            this.frameItem = new Array;
            var size = this._byte.readInt();
            var $scene = JSON.parse(this._byte.readUTFBytes(size));
            for (var i = 0; i < $scene.length; i++) {
                var $frameNodeVo = new Pan3d.FrameNodeVo();
                $frameNodeVo.writeObject($scene[i]);
                this.frameItem.push($frameNodeVo);
            }
            this._completeFun();
        };
        Frame3dRes.frameNum = 1;
        return Frame3dRes;
    }(Pan3d.BaseRes));
    Pan3d.Frame3dRes = Frame3dRes;
    var FrameSceneChar = /** @class */ (function (_super) {
        __extends(FrameSceneChar, _super);
        function FrameSceneChar(value) {
            return _super.call(this, value) || this;
        }
        return FrameSceneChar;
    }(Pan3d.SceneChar));
    Pan3d.FrameSceneChar = FrameSceneChar;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Frame3dRes.js.map
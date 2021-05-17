var Pan3d;
(function (Pan3d) {
    var FrameNodeVo = /** @class */ (function () {
        function FrameNodeVo() {
        }
        FrameNodeVo.prototype.writeObject = function ($obj) {
            this.id = $obj.id;
            this.name = $obj.name;
            this.url = $obj.url;
            this.pointitem = new Array;
            for (var j = 0; j < $obj.pointitem.length; j++) {
                var $FrameLinePointVo = new Pan3d.FrameLinePointVo();
                $FrameLinePointVo.writeObject($obj.pointitem[j]);
                this.pointitem.push($FrameLinePointVo);
            }
            this.resurl = $obj.resurl;
            if (this.url.search(".prefab") != -1) {
                this.materialInfoArr = new Array;
                for (var i = 0; $obj.materialInfoArr && i < $obj.materialInfoArr.length; i++) {
                    this.materialInfoArr.push($obj.materialInfoArr[i]);
                }
                this.noLight = $obj.noLight;
                this.directLight = $obj.directLight;
                this.receiveShadow = $obj.receiveShadow;
                if (this.noLight == false) {
                    this.lighturl = $obj.lighturl;
                }
                this.materialurl = $obj.materialurl;
                this.type = 1;
            }
            if (this.url.search(".lyf") != -1) {
                this.type = 2;
            }
            if (this.url.search(".zzw") != -1) {
                this.type = 3;
            }
        };
        return FrameNodeVo;
    }());
    Pan3d.FrameNodeVo = FrameNodeVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=FrameNodeVo.js.map
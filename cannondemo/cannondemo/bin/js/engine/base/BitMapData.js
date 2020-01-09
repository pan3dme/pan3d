var engine;
(function (engine) {
    var base;
    (function (base) {
        var BitMapData = (function () {
            function BitMapData($w, $h) {
                this.width = $w;
                this.height = $h;
                var $ctx = UIManager.getInstance().getContext2D(this.width, this.height, false);
                this.imgData = $ctx.getImageData(0, 0, this.width, this.height);
                for (var k = 0; k < this.imgData.data.length; k += 4) {
                    this.imgData.data[k + 0] = 255;
                    this.imgData.data[k + 1] = 255;
                    this.imgData.data[k + 2] = 255;
                    this.imgData.data[k + 3] = 255;
                }
            }
            BitMapData.prototype.getIndexByPos = function ($tx, $ty) {
                var a = $ty * this.width + $tx;
                return 4 * a;
            };
            BitMapData.prototype.setRgb = function ($tx, $ty, $ve) {
                $tx = Math.round($tx);
                $ty = Math.round($ty);
                var $idx = this.getIndexByPos($tx, $ty);
                this.imgData.data[$idx + 0] = $ve.x * 255;
                this.imgData.data[$idx + 1] = $ve.y * 255;
                this.imgData.data[$idx + 2] = $ve.z * 255;
                this.imgData.data[$idx + 3] = 255;
            };
            BitMapData.prototype.getRgb = function ($tx, $ty) {
                $tx = Math.round($tx);
                $ty = Math.round($ty);
                var $v = new Vector3D();
                var $idx = this.getIndexByPos($tx, $ty);
                $v.x = this.imgData.data[$idx + 0] / 255;
                $v.y = this.imgData.data[$idx + 1] / 255;
                $v.z = this.imgData.data[$idx + 2] / 255;
                $v.w = 1;
                return $v;
            };
            return BitMapData;
        }());
        base.BitMapData = BitMapData;
    })(base = engine.base || (engine.base = {}));
})(engine || (engine = {}));
//# sourceMappingURL=BitMapData.js.map
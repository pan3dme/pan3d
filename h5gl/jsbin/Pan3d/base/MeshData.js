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
    var MeshData = /** @class */ (function (_super) {
        __extends(MeshData, _super);
        function MeshData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.boneIDAry = new Array;
            _this.boneWeightAry = new Array;
            _this.boneNewIDAry = new Array;
            _this.particleAry = new Array;
            return _this;
        }
        MeshData.prototype.getBindPosMatrix = function () {
            var ary = new Array;
            var invertAry = new Array;
            for (var i = 0; i < this.bindPosAry.length; i++) {
                var objbone = this.bindPosAry[i];
                var OldQ = new Pan3d.Quaternion(objbone[0], objbone[1], objbone[2]);
                OldQ.setMd5W();
                var newM = OldQ.toMatrix3D();
                newM.appendTranslation(objbone[3], objbone[4], objbone[5]);
                invertAry.push(newM.clone());
                newM.invert();
                ary.push(newM);
            }
            this.bindPosMatrixAry = ary;
            this.bindPosInvertMatrixAry = invertAry;
        };
        MeshData.prototype.clone = function () {
            var temp = new MeshData(this.scene3D);
            for (var key in this) {
                temp[key] = this[key];
            }
            return temp;
        };
        return MeshData;
    }(Pan3d.ObjData));
    Pan3d.MeshData = MeshData;
    var BindParticle = /** @class */ (function () {
        //public particle: CombineParticle;
        function BindParticle($url, $socketName) {
            this.url = $url;
            this.socketName = $socketName;
        }
        return BindParticle;
    }());
    Pan3d.BindParticle = BindParticle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MeshData.js.map
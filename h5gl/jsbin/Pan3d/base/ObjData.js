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
    var ObjData = /** @class */ (function (_super) {
        __extends(ObjData, _super);
        function ObjData(value) {
            var _this = _super.call(this, value) || this;
            _this.vertices = new Array;
            _this.uvs = new Array;
            _this.indexs = new Array;
            _this.lightuvs = new Array;
            _this.normals = new Array;
            _this.tangents = new Array;
            _this.bitangents = new Array;
            _this.compressBuffer = false;
            _this.hasdispose = false;
            return _this;
        }
        ObjData.prototype.upToGpu = function () {
            if (this.indexs.length) {
                this.treNum = this.indexs.length;
                var context3D = this.scene3D.context3D;
                this.vertices ? this.vertexBuffer = context3D.uploadBuff3D(this.vertices) : null;
                this.uvs ? this.uvBuffer = context3D.uploadBuff3D(this.uvs) : null;
                this.normals ? this.normalsBuffer = context3D.uploadBuff3D(this.normals) : null;
                this.indexs ? this.indexBuffer = context3D.uploadIndexBuff3D(this.indexs) : null;
            }
        };
        return ObjData;
    }(Pan3d.ResCount));
    Pan3d.ObjData = ObjData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ObjData.js.map
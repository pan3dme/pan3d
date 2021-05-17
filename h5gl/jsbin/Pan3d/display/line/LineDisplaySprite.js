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
    var LineDisplaySprite = /** @class */ (function (_super) {
        __extends(LineDisplaySprite, _super);
        function LineDisplaySprite(value) {
            var _this = _super.call(this, value) || this;
            _this.baseColor = new Pan3d.Vector3D(1, 0, 0);
            _this.scene3D.progrmaManager.registe(Pan3d.LineDisplayShader.LineDisplayShader, new Pan3d.LineDisplayShader(_this.scene3D));
            _this.shader3D = _this.scene3D.progrmaManager.getProgram(Pan3d.LineDisplayShader.LineDisplayShader);
            _this.initData();
            return _this;
        }
        LineDisplaySprite.prototype.initData = function () {
            this.makeLineMode(new Pan3d.Vector3D(0, 0, 0), new Pan3d.Vector3D(100, 0, 0), new Pan3d.Vector3D(1, 0, 0));
            this.upToGpu();
        };
        LineDisplaySprite.prototype.upToGpu = function () {
            this.objData.upToGpu();
        };
        LineDisplaySprite.prototype.makeLineMode = function (a, b, $color) {
            if ($color === void 0) { $color = null; }
            if (!this.lineVecPos || !this.lineIndex) {
                this.clear();
            }
            if ($color) {
                this.baseColor = $color;
            }
            this.lineVecPos.push(a.x, a.y, a.z);
            this.lineVecPos.push(b.x, b.y, b.z);
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1);
            if (this.objData == null) {
                this.objData = new Pan3d.ObjData(this.scene3D);
            }
            this.objData.treNum = this.lineIndex.length;
            this.objData.vertices = this.lineVecPos;
            this.objData.normals = this.lineColor;
            this.objData.indexs = this.lineIndex;
        };
        LineDisplaySprite.prototype.clear = function () {
            this.lineVecPos = new Array;
            this.lineIndex = new Array;
            this.lineColor = new Array;
        };
        LineDisplaySprite.prototype.upFrame = function () {
            if (this.objData && this.objData.indexBuffer) {
                var context3D = this.scene3D.context3D;
                context3D.setProgram(this.shader3D.program);
                context3D.setVa(0, 3, this.objData.vertexBuffer);
                context3D.setVa(1, 3, this.objData.normalsBuffer);
                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
                context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return LineDisplaySprite;
    }(Pan3d.Display3D));
    Pan3d.LineDisplaySprite = LineDisplaySprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LineDisplaySprite.js.map
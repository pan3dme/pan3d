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
    var DisplayRect3dSprite = /** @class */ (function (_super) {
        __extends(DisplayRect3dSprite, _super);
        function DisplayRect3dSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.initData();
            _this.scene3D.progrmaManager.registe(Pan3d.DisplayRect3dShader.DisplayRect3dShader, new Pan3d.DisplayRect3dShader(_this.scene3D));
            _this.shader3D = _this.scene3D.progrmaManager.getProgram(Pan3d.DisplayRect3dShader.DisplayRect3dShader);
            return _this;
        }
        DisplayRect3dSprite.prototype.initData = function () {
            this.objData = new Pan3d.ObjData(this.scene3D);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0.5);
            this.objData.vertices.push(100, 0, 0.5);
            this.objData.vertices.push(100, 100, 100);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.upToGpu();
            this.posMatrix.identity();
            this.posMatrix.appendScale(0.2, 0.2, 1);
        };
        DisplayRect3dSprite.prototype.upFrame = function () {
            if (this.objData && this.objData.indexBuffer) {
                var context3D = this.scene3D.context3D;
                context3D.setProgram(this.shader3D.program);
                context3D.setVa(0, 3, this.objData.vertexBuffer);
                context3D.setVa(1, 2, this.objData.uvBuffer);
                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
                context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return DisplayRect3dSprite;
    }(Pan3d.Display3D));
    Pan3d.DisplayRect3dSprite = DisplayRect3dSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DisplayRect3dSprite.js.map
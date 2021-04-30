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
    var LineDisplayShader = /** @class */ (function (_super) {
        __extends(LineDisplayShader, _super);
        function LineDisplayShader(value) {
            return _super.call(this, value) || this;
        }
        LineDisplayShader.prototype.binLocation = function (gl) {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "v3Colors");
        };
        LineDisplayShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;\n" +
                "attribute vec3 v3Colors;\n" +
                "varying vec3 v_colors;\n" +
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix;\n" +
                "void main(void)" +
                "{" +
                "   v_colors = v3Colors;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
                "}";
            return $str;
        };
        LineDisplayShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec3 v_colors;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(v_colors,1.0);\n" +
                "}";
            return $str;
        };
        LineDisplayShader.LineDisplayShader = "LineDisplayShader";
        return LineDisplayShader;
    }(Pan3d.Shader3D));
    Pan3d.LineDisplayShader = LineDisplayShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LineDisplayShader.js.map
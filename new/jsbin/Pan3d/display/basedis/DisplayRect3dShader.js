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
    var DisplayRect3dShader = /** @class */ (function (_super) {
        __extends(DisplayRect3dShader, _super);
        function DisplayRect3dShader(value) {
            return _super.call(this, value) || this;
        }
        DisplayRect3dShader.prototype.binLocation = function (gl) {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "u2Texture");
        };
        DisplayRect3dShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix;\n" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
                "}";
            return $str;
        };
        DisplayRect3dShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n" +
                "}";
            return $str;
        };
        DisplayRect3dShader.DisplayRect3dShader = "DisplayRect3dShader";
        return DisplayRect3dShader;
    }(Pan3d.Shader3D));
    Pan3d.DisplayRect3dShader = DisplayRect3dShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DisplayRect3dShader.js.map
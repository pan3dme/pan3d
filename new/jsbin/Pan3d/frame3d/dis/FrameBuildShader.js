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
    var FrameBuildShader = /** @class */ (function (_super) {
        __extends(FrameBuildShader, _super);
        function FrameBuildShader(value) {
            return _super.call(this, value) || this;
        }
        FrameBuildShader.prototype.binLocation = function (gl) {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "u2Texture");
        };
        FrameBuildShader.prototype.getVertexShaderString = function () {
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
        FrameBuildShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "uniform sampler2D fs0;" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(fs0, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        FrameBuildShader.FrameBuildShader = "FrameBuildShader";
        return FrameBuildShader;
    }(Pan3d.Shader3D));
    Pan3d.FrameBuildShader = FrameBuildShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=FrameBuildShader.js.map
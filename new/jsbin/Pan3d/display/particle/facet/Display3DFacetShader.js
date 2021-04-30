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
    var Display3DFacetShader = /** @class */ (function (_super) {
        __extends(Display3DFacetShader, _super);
        function Display3DFacetShader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Display3DFacetShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        };
        Display3DFacetShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 viewMatrix;\n" +
                "uniform mat4 camMatrix;\n" +
                "uniform mat4 modeMatrix;\n" +
                "uniform mat4 rotMatrix;\n" +
                "uniform vec2 uvMove;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +
                "   v0 = v2TexCoord+uvMove  ;\n" +
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position =viewMatrix*camMatrix*modeMatrix*rotMatrix* vt0;" +
                "}";
            return $str;
        };
        Display3DFacetShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D tex;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Display3DFacetShader.Display3D_Facet_Shader = "Display3DFacetShader";
        return Display3DFacetShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DFacetShader = Display3DFacetShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DFacetShader.js.map
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
    var Display3DLocusShader = /** @class */ (function (_super) {
        __extends(Display3DLocusShader, _super);
        function Display3DLocusShader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Display3DLocusShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
            if (this.paramAry[0]) {
                $context.bindAttribLocation(this.program, 2, "v3Normal");
            }
        };
        Display3DLocusShader.prototype.getMat4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_mat4[key] + "]";
        };
        Display3DLocusShader.prototype.getVec4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_vec4[key][0] + "][" + Display3DLocusShader.shader_vec4[key][1] + "]";
        };
        Display3DLocusShader.getVcSize = function () {
            return 4;
        };
        Display3DLocusShader.prototype.getVertexShaderString = function () {
            var isWatchEye = this.paramAry[0];
            var isUV = this.paramAry[1];
            var hasParticleColor = this.paramAry[2];
            var defineBaseStr = "attribute vec4 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "attribute vec4 v3Normal;\n" +
                "uniform mat4 viewMatrix;\n" +
                "uniform mat4 camMatrix;\n" +
                "uniform mat4 modeMatrix;\n" +
                "uniform vec3 vcmat30;\n" +
                "varying vec2 v0;\n" +
                "varying vec4 v2;\n" +
                "varying vec2 v1;\n";
            if (isWatchEye) { //面向视角需要有镜头
                defineBaseStr += "uniform vec4 v3CamPos;\n";
            }
            var mainBaseStr = "   vec2 tempv0 = v2TexCoord;\n" +
                "   tempv0.x -= vcmat30.x;\n" +
                "   float alpha = tempv0.x/vcmat30.y;\n" +
                "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n" +
                "   float kill = -tempv0.x;\n" +
                "   kill *= tempv0.x - vcmat30.z;\n" +
                "   v2 = vec4(kill,0.0,0.0,alpha);\n" +
                "   v1 = v2TexCoord;\n" +
                "   v0 = tempv0;\n" +
                "   vec4 tempPos = modeMatrix* v3Position;\n" +
                "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n" +
                "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n" +
                "   gl_Position = viewMatrix  * camMatrix * modeMatrix* tempPos;\n";
            var resultStr = defineBaseStr +
                "void main(void){\n" +
                mainBaseStr +
                "}";
            return resultStr;
        };
        Display3DLocusShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
                "uniform vec4 fc[1];\n" +
                "varying vec2 v0;\n" +
                "varying vec4 v2;\n" +
                "varying vec2 v1;\n" +
                "void main(void){\n" +
                "\n" +
                "vec4 ft0 = texture2D(fs0,v0);\n" +
                "vec4 ft1 = texture2D(fs1,v1);\n" +
                "gl_FragColor = vec4(1,0,0,1);\n" +
                "\n" +
                "}";
            return $str;
        };
        Display3DLocusShader.Display3D_Locus_Shader = "Display3DLocusShader";
        Display3DLocusShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
        Display3DLocusShader.shader_vec4 = { uvMove: [3, 0], camPos: [3, 1], isUv: [3, 2] };
        return Display3DLocusShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DLocusShader = Display3DLocusShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DLocusShader.js.map
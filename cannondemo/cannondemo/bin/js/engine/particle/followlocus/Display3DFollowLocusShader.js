var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var followlocus;
        (function (followlocus) {
            var Display3DFollowLocusShader = (function (_super) {
                __extends(Display3DFollowLocusShader, _super);
                function Display3DFollowLocusShader() {
                    return _super.call(this) || this;
                }
                Display3DFollowLocusShader.prototype.binLocation = function ($context) {
                    $context.bindAttribLocation(this.program, 0, "v3Position");
                    $context.bindAttribLocation(this.program, 1, "v2TexCoord");
                };
                Display3DFollowLocusShader.prototype.getMat4Str = function (key) {
                    //return key;
                    return "vcmat[" + Display3DFollowLocusShader.shader_mat4[key] + "]";
                };
                Display3DFollowLocusShader.prototype.getVec4Str = function (key) {
                    //return key;
                    return "vcmat[" + Display3DFollowLocusShader.shader_vec4[key][0] + "][" + Display3DFollowLocusShader.shader_vec4[key][1] + "]";
                };
                Display3DFollowLocusShader.getVcSize = function () {
                    return 3;
                };
                Display3DFollowLocusShader.prototype.getVertexShaderString = function () {
                    var defineBaseStr = "attribute vec3 v3Position;\n" +
                        "attribute vec2 v2TexCoord;\n" +
                        "uniform mat4 vcmat[" + Display3DFacetShader.getVcSize() + "];\n" +
                        // "uniform mat4 viewMatrix3D;\n" +
                        // "uniform mat4 camMatrix3D;\n" +
                        // "uniform vec3 camPos;\n" +
                        "uniform vec3 bindpos[30];\n" +
                        "varying vec2 v0;\n";
                    var watchPosStr = "   vec3 cpos = bindpos[int(v3Position.x)];\n" +
                        "   vec3 mulPos = normalize(vec3(" + this.getVec4Str("camPos") + ".xyz) - cpos);\n" +
                        "   vec3 normals = bindpos[int(v3Position.y)];\n" +
                        "   mulPos = cross(mulPos, normals);\n" +
                        "   mulPos = normalize(mulPos);\n" +
                        "   mulPos *= v3Position.z;\n" +
                        "   cpos += mulPos;\n" +
                        "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * vec4(cpos,1.0);\n";
                    var uvStr = "v0 = v2TexCoord;\n";
                    var resultAllStr = defineBaseStr + "void main(){\n" + watchPosStr + uvStr + "}";
                    return resultAllStr;
                };
                Display3DFollowLocusShader.prototype.getFragmentShaderString = function () {
                    var $str = " precision mediump float;\n" +
                        "uniform sampler2D tex;\n" +
                        "varying vec2 v0;\n" +
                        "void main(void)\n" +
                        "{\n" +
                        "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                        "gl_FragColor = infoUv;\n" +
                        "}";
                    return $str;
                };
                return Display3DFollowLocusShader;
            }(engine.program.Shader3D));
            Display3DFollowLocusShader.Display3D_FollowLocus_Shader = "Display3DFollowLocusShader";
            Display3DFollowLocusShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1 };
            Display3DFollowLocusShader.shader_vec4 = { camPos: [2, 0] };
            followlocus.Display3DFollowLocusShader = Display3DFollowLocusShader;
        })(followlocus = particle.followlocus || (particle.followlocus = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Display3DFollowLocusShader.js.map
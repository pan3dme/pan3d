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
    var Display3DBallShader = /** @class */ (function (_super) {
        __extends(Display3DBallShader, _super);
        function Display3DBallShader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Display3DBallShader.prototype.binLocation = function (gl) {
            gl.bindAttribLocation(this.program, 0, "vPosition");
            gl.bindAttribLocation(this.program, 1, "texcoord");
            gl.bindAttribLocation(this.program, 2, "basePos");
            gl.bindAttribLocation(this.program, 3, "speed");
            var needRotation = this.paramAry[3];
            if (needRotation) {
                gl.bindAttribLocation(this.program, 4, "rotation");
            }
            var hasRandomClolr = this.paramAry[1];
            if (hasRandomClolr) {
                gl.bindAttribLocation(this.program, 5, "color");
            }
        };
        Display3DBallShader.prototype.getVertexShaderString = function () {
            var hasParticle = this.paramAry[0];
            var hasRandomClolr = this.paramAry[1];
            var isMul = this.paramAry[2];
            var needRotation = this.paramAry[3];
            var needScale = this.paramAry[4];
            var needAddSpeed = this.paramAry[5];
            var uvType = this.paramAry[6];
            var defineBaseStr = "";
            var funBaseStr = "";
            var mainBaseStr = "";
            var rotationStr = "";
            defineBaseStr = "attribute vec4 vPosition;\n" +
                "attribute vec3 texcoord;\n" +
                "attribute vec4 basePos;\n" +
                "attribute vec3 speed;\n" +
                "uniform mat4 viewMatrix;\n" +
                "uniform mat4 camMatrix;\n" +
                "uniform mat4 modeMatrix;\n" +
                "uniform mat4 rotMatrix;\n" +
                "uniform vec4 vcmat50;\n" +
                "uniform vec4 vcmat51;\n" +
                "uniform vec4 vcmat52;\n" +
                "uniform vec4 vcmat53;\n" +
                "varying vec2 v0;\n" +
                "varying vec2 v1;\n" +
                "varying vec3 outvec3;\n";
            funBaseStr = "vec4 IW(vec4 v) {\n" +
                "return viewMatrix*camMatrix*modeMatrix* v;\n" +
                "}\n" +
                "float CTM() {\n" +
                "float t = vcmat50.x- basePos.w;\n" +
                "if (vcmat50.w > 0.0 && t >= 0.0) {\n" +
                "t = fract(t /vcmat50.z) * vcmat50.z;\n" +
                "}\n" +
                "return t;\n" +
                "}\n" +
                "float STM(float ctime) {\n" +
                "float t = ctime - vcmat51.w;\n" +
                "t = max(t,0.0);\n" +
                "return t;\n" +
                "}\n" +
                "vec4 S_POS(vec4 pos ,float stime) {\n" +
                "float sf = vcmat51.x * stime;\n" +
                "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {\n" +
                "sf += sin(vcmat51.y * stime) * vcmat51.z;\n" +
                "}\n" +
                "sf=min(sf,vcmat52.z);\n" +
                "sf=max(sf,vcmat52.w);\n" +
                "vec2 sv2 = vec2(vcmat52.x * sf, vcmat52.y * sf);\n" +
                "sv2 = sv2 + 1.0;\n" +
                "pos.x *= sv2.x;\n" +
                "pos.y *= sv2.y;\n" +
                "return pos;\n" +
                "}" +
                "vec3 ADD_POS(vec3 speed ,float ctime) {\n" +
                "vec3 addPos = speed * ctime;\n" +
                "vec3 uspeed = vec3(0,0,0);\n" +
                "if(vcmat50.y != 0.0 && length(speed) != 0.0) {\n" +
                "uspeed = vec3(speed.x, speed.y, speed.z);\n" +
                "uspeed = normalize(uspeed);\n" +
                "uspeed = uspeed * vcmat50.y;\n" +
                "uspeed.xyz = uspeed.xyz + vcmat53.xyz;\n" +
                "} else {\n" +
                "uspeed = vec3(vcmat53.x, vcmat53.y, vcmat53.z);\n" +
                "}\n" +
                "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n" +
                "return addPos;\n" +
                "}\n";
            if (needRotation > 0) {
                defineBaseStr += "attribute vec2 rotation;\n";
                rotationStr = "float angle = rotation.x + rotation.y * ctime;\n" +
                    "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
                    "np.z = np.x * pos.y + np.y * pos.x;\n" +
                    "np.w = np.y * pos.y - np.x * pos.x;\n" +
                    "pos.xy = np.zw;\n";
            }
            var sceleStr = " "; //缩放比例
            if (needScale) {
                sceleStr = "pos = S_POS(pos,stime);\n"; //缩放比例
            }
            mainBaseStr = "vec4 pos = vec4(vPosition.xyz,1.0);\n" +
                "float ctime = CTM();\n" +
                "float stime = STM(ctime);\n" +
                rotationStr +
                "if (ctime < 0.0 || ctime > vcmat50.z) {\n" + //时间周期内-1；
                "pos.x =0.0;\n" + //设置不可见
                "pos.y =0.0;\n" + //设置不可见
                "}else{\n" +
                sceleStr + //缩放比例
                "pos = rotMatrix*pos;\n" + //面向视角
                "vec3 addPos =ADD_POS(speed,ctime);\n" + //加速度
                "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n" +
                "}\n" +
                "gl_Position =IW(pos);\n" +
                "v0=vec2(texcoord.xy);\n" +
                "v1=vec2(ctime/vcmat50.z,0.0);\n";
            var outStr = defineBaseStr + funBaseStr + "void main()\n" +
                "{\n" +
                mainBaseStr +
                "}";
            return outStr;
        };
        Display3DBallShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D fs0;\n" +
                "uniform sampler2D fs1;\n" +
                "uniform vec4 fc[1];\n" +
                "varying vec2 v0;\n" +
                "varying vec2 v1;\n" +
                "void main(void){\n" +
                "\n" +
                "vec4 ft0 = texture2D(fs0,v0);\n" +
                "ft0.xyz *= ft0.w;\n" +
                "vec4 ft1 = texture2D(fs1,v1);\n" +
                "ft1.xyz = ft1.xyz * ft1.w;\n" +
                "vec4 ft2 = ft0 * fc[0];\n" +
                "ft0 = ft2 * ft1;\n" +
                "ft1.xyz = ft0.xyz;\n" +
                "ft1.w = ft0.w;\n" +
                "gl_FragColor = vec4(1,0,0,1);\n" +
                "\n" +
                "}";
            return $str;
        };
        Display3DBallShader.Display3D_Ball_Shader = "Display3DBallShader";
        return Display3DBallShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DBallShader = Display3DBallShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DBallShader.js.map
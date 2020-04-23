"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ProgrmaManager = /** @class */ (function (_super) {
    __extends(ProgrmaManager, _super);
    function ProgrmaManager() {
        //this._dic = new Object();
        return _super.call(this) || this;
    }
    ProgrmaManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new ProgrmaManager();
        }
        return this._instance;
    };
    ProgrmaManager.prototype.getProgram = function ($str) {
        if (this._dic[$str]) {
            return this._dic[$str];
        }
        else {
            alert("please registe Program=>" + $str);
            return null;
        }
    };
    ProgrmaManager.prototype.registe = function ($str, $shader3D) {
        if (!this._dic[$str]) {
            $shader3D.encode();
            $shader3D.useNum = 1;
            $shader3D.name = $str;
            this._dic[$str] = $shader3D;
        }
    };
    ProgrmaManager.prototype.getMaterialProgram = function (key, shaderCls, $material, paramAry, parmaByFragmet) {
        if (paramAry === void 0) { paramAry = null; }
        if (parmaByFragmet === void 0) { parmaByFragmet = false; }
        var keyStr = key + "_" + $material.url;
        if (keyStr.search("Material_shader_res") != -1 && true) { //FIXME
            console.log(keyStr);
            this.outShader($material.shaderStr);
            $material.shaderStr =
                "precision mediump float;\n" +
                    "uniform sampler2D fs0;\n" +
                    "uniform sampler2D fs1;\n" +
                    "uniform samplerCube fs2;\n" +
                    "uniform vec4 fc[2];\n" +
                    "varying vec2 v0;\n" +
                    "varying vec3 v1;\n" +
                    "varying vec3 v4;\n" +
                    "void main(void){\n" +
                    "\n" +
                    "vec4 ft0 = texture2D(fs0,v0);\n" +
                    "vec4 ft1 = vec4(ft0.xyz,1.0);\n" +
                    "vec4 ft2 = vec4(0,0,0,1);\n" +
                    "ft2.xyz = v4.xyz;\n" +
                    "vec4 ft3 = vec4(0,0,0,1);\n" +
                    "ft3.xyz = mix(vec3(fc[1].y,fc[1].y,fc[1].y) * 0.08,ft1.xyz,fc[1].x);\n" +
                    "vec4 ft4 = vec4(0,0,0,1);\n" +
                    "ft4.xyz = fc[0].xyz - v1.xyz;\n" +
                    "ft4.xyz = normalize(ft4.xyz);\n" +
                    "ft4.y= dot(ft4.xyz,ft2.xyz);\n" +
                    "ft4.x = fc[1].z;\n" +
                    "ft4 = texture2D(fs1,ft4.xy);\n" +
                    "ft3.xyz = ft3.xyz * ft4.x + ft4.y;\n" +
                    "ft3.xyz = ft3.xyz * fc[1].y;\n" +
                    "ft4.xyz = v1.xyz - fc[0].xyz;\n" +
                    "ft4.xyz = normalize(ft4.xyz);\n" +
                    //   "ft4.xyz = reflect(ft4.xyz,ft2.xyz);\n"+
                    //   "ft4 = textureCube(fs2,ft4.xyz);\n"+
                    // "ft3.xyz = ft3.xyz * ft4.xyz;\n"+
                    // "ft4.xyz = ft1.xyz * (1.0-fc[1].x);\n"+
                    // "ft4.xyz = ft4.xyz + ft3.xyz;\n"+
                    "ft4.w = 1.0;\n" +
                    "gl_FragColor = fc[0];\n" +
                    "\n" +
                    "}";
        }
        if (paramAry) {
            for (var i = 0; i < paramAry.length; i++) {
                keyStr += "_" + paramAry[i];
            }
            if (parmaByFragmet) {
                keyStr += "true_";
            }
            else {
                keyStr += "false_";
            }
        }
        if (this._dic[keyStr]) {
            this._dic[keyStr].useNum++;
            return this._dic[keyStr];
        }
        if (parmaByFragmet) {
            paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                $material.noLight, $material.fogMode];
        }
        var shader = new shaderCls();
        shader.paramAry = paramAry;
        shader.fragment = $material.shaderStr;
        var encodetf = shader.encode();
        shader.useNum++;
        if (!encodetf) {
            console.log("**********错误" + keyStr);
            console.log(shader.vertex);
            console.log(shader.fragment);
        }
        if (keyStr.search("Material_shader_res/content/materialinstance/jiemianwuqi/staticstand_byte.txt") != -1 && true) {
            this.outShader(shader.fragment);
            console.log(shader.vertex);
            console.log(shader.fragment);
        }
        this._dic[keyStr] = shader;
        return shader;
    };
    ProgrmaManager.prototype.outShader = function ($str) {
        var $item = $str.split("\n");
        console.log("----");
        for (var i = 0; i < $item.length; i++) {
            var str = "\"";
            str += $item[i];
            if (i < ($item.length - 1)) {
                str += "\\n";
                str += "\"";
                str += "\+";
            }
            else {
                str += "\"";
            }
            console.log(str);
        }
        console.log("----");
    };
    ProgrmaManager.prototype.gc = function () {
        _super.prototype.gc.call(this);
    };
    return ProgrmaManager;
}(ResGC));
//# sourceMappingURL=ProgramManager.js.map
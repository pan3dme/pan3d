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
        if (keyStr.search("Display3DFacetShader_res") != -1 && true) { //FIXME
            //  console.log(keyStr)
            // this.outShader($material.shaderStr)
            /*
                         $material.shaderStr =
                        "precision mediump float;\n"+
                        "uniform sampler2D fs0;\n"+
                        "uniform sampler2D fs1;\n"+
                        "uniform vec4 fc[1];\n"+
                        "varying vec2 v0;\n"+
                        "varying vec4 v2;\n"+
                        "varying vec2 v1;\n"+
                        "void main(void){\n"+
            
                        "vec4 ft0 = texture2D(fs0,v0);\n"+
                        "ft0.xyz *= ft0.w;\n"+
                        "vec4 ft1 = texture2D(fs1,v1);\n"+
                        "ft1.xyz = ft1.xyz * ft1.w;\n"+
                        "vec4 ft2 = ft0 * ft1;\n"+
                        "ft0 = ft2 * v2.w;\n"+
                        "ft1.xyz = ft0.xyz;\n"+
                        "ft1.w = ft0.w;\n"+
            
                        "if(v2.x<fc[0].x){discard;}\n"+
                        "gl_FragColor = texture2D(fs0,v0);\n"+
            
                        "}"
                        */
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
            console.log("************错误" + keyStr);
            console.log(shader.vertex);
            console.log(shader.fragment);
        }
        if (keyStr.search("Material_Anim_shader_res") != -1 && true) {
            this.outShader(shader.vertex);
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
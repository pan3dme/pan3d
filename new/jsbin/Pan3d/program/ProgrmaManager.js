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
    var ProgrmaManager = /** @class */ (function (_super) {
        __extends(ProgrmaManager, _super);
        function ProgrmaManager(value) {
            return _super.call(this, value) || this;
        }
        ProgrmaManager.prototype.getMaterialProgram = function (key, shaderCls, $material, paramAry, parmaByFragmet) {
            if (paramAry === void 0) { paramAry = null; }
            if (parmaByFragmet === void 0) { parmaByFragmet = false; }
            var keyStr = key + "_" + $material.url;
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
            if (this.dic[keyStr]) {
                this.dic[keyStr].useNum++;
                return this.dic[keyStr];
            }
            console.log(keyStr);
            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                    $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                    $material.noLight, $material.fogMode];
            }
            var shader = new shaderCls(this.scene3D);
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            console.log(keyStr);
            if (keyStr.search("r33333") != -1 && true) { //FIXME
                this.outShader(shader.getVertexShaderString());
                this.outShader(shader.fragment);
                console.log(">>>>>>>>>>>>>>>>>>>");
                console.log("----修改后-------");
                console.log("以上为修改后的");
                shader.fragment =
                    " ";
            }
            var encodetf = shader.encode();
            if (!encodetf) {
                console.log("**********错误" + keyStr);
                console.log(shader.vertex);
                console.log(shader.fragment);
            }
            this.dic[keyStr] = shader;
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
        ProgrmaManager.prototype.getProgram = function ($str) {
            if (this.dic[$str]) {
                return this.dic[$str];
            }
            else {
                alert("please registe Program=>" + $str);
                return null;
            }
        };
        ProgrmaManager.prototype.registe = function ($str, $shader3D) {
            if (!this.dic[$str]) {
                $shader3D.encode();
                $shader3D.name = $str;
                this.dic[$str] = $shader3D;
            }
        };
        return ProgrmaManager;
    }(Pan3d.ResGC));
    Pan3d.ProgrmaManager = ProgrmaManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ProgrmaManager.js.map
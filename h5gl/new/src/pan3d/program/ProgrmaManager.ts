module Pan3d {
    export class ProgrmaManager extends ResGC {
        public getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry: any = null, parmaByFragmet: boolean = false): Shader3D {
            var keyStr: string = key + "_" + $material.url;
            if (paramAry) {
                for (var i: number = 0; i < paramAry.length; i++) {
                    keyStr += "_" + paramAry[i];
                }
                if (parmaByFragmet) {
                    keyStr += "true_";
                } else {
                    keyStr += "false_";
                }
            }
            if (this.dic[keyStr]) {
                this.dic[keyStr].useNum++;
                return this.dic[keyStr];
            }
            console.log(keyStr)


            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                $material.noLight, $material.fogMode];
            }
            var shader: Shader3D = new shaderCls(this.scene3D);
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;

            if (keyStr.search("res/content/particleresources/mat") != -1 && true) { //FIXME

                // this.outShader(shader.getVertexShaderString());
               

                shader.fragment =
                "precision mediump float;\n"+
                "uniform sampler2D fc0;\n" +
                "varying vec2 v0;\n"+
                "void main(void){\n"+
                "\n"+
                    "vec4 infoUv = texture2D(fc0, v0.xy);\n" +
                   "gl_FragColor =infoUv;\n"+
                "\n"+
                "}";

                this.outShader(shader.getVertexShaderString());
                this.outShader(shader.fragment);

                 this.outShader( keyStr );
 

            }


            var encodetf: boolean = shader.encode();

            if (!encodetf) {
                console.log("**********错误" + keyStr);
                console.log(shader.vertex);
                console.log(shader.fragment);
            }

            this.dic[keyStr] = shader;
            return shader;
        }

        public constructor(value: Scene3D) {
            super(value);
        }
        public outShader($str: string): void {
            var $item: Array<string> = $str.split("\n")

            console.log("----")

            for (var i: number = 0; i < $item.length; i++) {
                var str: string = "\"";
                str += $item[i];

                if (i < ($item.length - 1)) {
                    str += "\\n"
                    str += "\""
                    str += "\+"
                } else {
                    str += "\""
                }

                console.log(str)
            }
            console.log("----")
        }

        public getProgram($str: string): Shader3D {
            if (this.dic[$str]) {
                return this.dic[$str];
            } else {
                alert("please registe Program=>" + $str);
                return null
            }
        }
        public registe($str, $shader3D: Shader3D): void {
            if (!this.dic[$str]) {
                $shader3D.encode();
                $shader3D.name = $str;
                this.dic[$str] = $shader3D;
            }

        }

    }
}
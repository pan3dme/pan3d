module Pan3d {
    export class ProgrmaManager extends ResGC{
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
          
            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                $material.noLight, $material.fogMode];
            }
            var shader: Shader3D = new shaderCls(this.scene3D);
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            var encodetf: boolean = shader.encode();
            console.log(keyStr);
            if (!encodetf) {
                //console.log("**********错误" + keyStr);
                console.log(shader.vertex);
                console.log(shader.fragment);
            }
            if(keyStr.indexOf("o forest/fx/g_water_01_byte.txt")>-0)
            {
                console.log(shader.vertex);
                console.log(shader.fragment);
            }
            this.dic[keyStr] = shader;
            return shader;
        }

        public constructor(value:Scene3D)
        {
            super(value);
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
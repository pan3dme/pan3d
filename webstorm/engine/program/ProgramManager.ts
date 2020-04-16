class ProgrmaManager extends ResGC {
    //private _dic: Object
    private static _instance: ProgrmaManager;
    constructor() {
        //this._dic = new Object();
        super();
    }
    public static getInstance(): ProgrmaManager {
        if (!this._instance) {
            this._instance = new ProgrmaManager();
        }
        return this._instance;
    }
    public getProgram($str: string): Shader3D {
        if (this._dic[$str]) {
            return this._dic[$str]; 
        } else {
            alert("please registe Program=>" + $str);
            return null
        }
    }
    public registe($str, $shader3D: Shader3D): void {
        if (!this._dic[$str]) {
            $shader3D.encode();
            $shader3D.useNum = 1;
            $shader3D.name = $str;
            this._dic[$str] = $shader3D;
        }

    }
    
    public getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry: any = null, parmaByFragmet: boolean = false): Shader3D {
        var keyStr: string = key + "_" + $material.url;

        if (keyStr.search("Display3DBallShader_res") != -1 &&true) { //FIXME

        //  console.log(keyStr)
        this.outShader($material.shaderStr)


             $material.shaderStr =
            "precision mediump float;\n"+
            "precision mediump float;\n"+
            "uniform sampler2D fs0;\n"+
            "uniform sampler2D fs1;\n"+
            "uniform vec4 fc[1];\n"+
            "varying vec2 v0;\n"+
            "varying vec2 v1;\n"+
            "void main(void){\n"+

                "vec4 ft0 = texture2D(fs0,v0);\n"+
                "ft0.xyz *= ft0.w;\n"+
                "vec4 ft1 = texture2D(fs1,v1);\n"+
                "ft1.xyz = ft1.xyz * ft1.w;\n"+
                "vec4 ft2 = ft0 * fc[0];\n"+
                "ft0 = ft2 * ft1;\n"+
                "ft1.xyz = ft0.xyz;\n"+
                "ft1.w = ft0.w;\n"+
                "gl_FragColor = ft1;\n"+

            "}";





        }
        if (paramAry) {
            for (var i: number=0; i < paramAry.length; i++) {
                keyStr += "_" + paramAry[i];
            }
            if (parmaByFragmet) {
                keyStr += "true_";
            } else {
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
                $material.noLight,$material.fogMode];
        }

        var shader: Shader3D = new shaderCls();
        shader.paramAry = paramAry;
        shader.fragment = $material.shaderStr;
        var encodetf: boolean = shader.encode(); 
        shader.useNum++;

        if (!encodetf ){ 
            console.log("************错误" + keyStr);
            console.log(shader.vertex);
            console.log(shader.fragment);
        }
        if (keyStr.search("Display3DBallShader_33res") != -1 && true) {

            this.outShader(shader.vertex)
             console.log(shader.vertex);
             console.log(shader.fragment);
        }

        this._dic[keyStr] = shader;
        
        return shader;
    }
    public outShader($str:string): void
    {
        var $item:Array<string>=$str.split("\n")

        console.log("----")



        for (var i: number = 0; i < $item.length; i++)
        {
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

    public gc(): void {
        super.gc();
    }


}
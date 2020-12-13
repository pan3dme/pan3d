interface IShader {

    getVertexShaderString(): string
    getFragmentShaderString(): string
    encode(v?:string,f?:string): void
    binLocation($context: WebGLRenderingContext): void
}

module Pan3d {
    export class Shader3D extends ResCount implements IShader {
        public vertex: string
        public fragment: string
        public name: string;
        public program: WebGLProgram;
        public vShader: WebGLShader;
        public fShader: WebGLShader;

        public get paramAry() {
            return this._paramAry
        }
        private _paramAry: Array<any>;
        public set paramAry(value: Array<any>) {
            this._paramAry = value
        }

        public localDic: Object;
        constructor(value:Scene3D) {
            super(value);
            this.fragment = this.getFragmentShaderString()
        }
        public encode(v?: string, f?: string): boolean {
            if (v) {
                this.vertex = v
            } else {
                this.vertex = this.getVertexShaderString();
            }

            ////console.log(this.vertex);

            var $context: WebGLRenderingContext = this.scene3D.context3D.webGlRender;

            this.program = $context.createProgram();
            this.vShader = $context.createShader($context.VERTEX_SHADER);
            this.fShader = $context.createShader($context.FRAGMENT_SHADER);

            $context.shaderSource(this.vShader, this.vertex);
            $context.shaderSource(this.fShader, this.fragment);

            $context.compileShader(this.vShader);
            $context.compileShader(this.fShader);

            $context.attachShader(this.program, this.vShader);
            $context.attachShader(this.program, this.fShader);

            this.binLocation($context);
            $context.linkProgram(this.program);
            //Scene_data.context3D.addProgram(this.program);

            this.localDic = new Object();


            var info: string = $context.getProgramInfoLog(this.program);
            var vInfo: string = $context.getShaderInfoLog(this.vShader);
            var fInfo: string = $context.getShaderInfoLog(this.fShader);

            if (info != "") {
                if (vInfo == "" && fInfo == "") {
                    return true;
                }
                //console.log("shader error: " + info + "," + vInfo + "," + fInfo);
                return false;
            } else {
                return true;
            }

        }

        public getWebGLUniformLocation($name: string): WebGLUniformLocation {
            var context3D:Context3D= this.scene3D.context3D;
            var local: WebGLUniformLocation = this.localDic[$name];
            if (local) {
                return local;
            } else {
                this.localDic[$name] =context3D.getLocation(this.program, $name);
                return this.localDic[$name];
            }
        }

        binLocation($context: WebGLRenderingContext): void {

        }
        getVertexShaderString(): string {
            return ""
        }
        getFragmentShaderString(): string {
            return ""
        }
       
    }
}
module Pan3d {
    export class BaseObjData {
        public vertices: Array<number> = new Array;
        public uvs: Array<number> = new Array;
        public indexs: Array<number> = new Array;
        public treNum: number = 0;
        public vertexBuffer: WebGLBuffer;
        public uvBuffer: WebGLBuffer;
        public indexBuffer: WebGLBuffer;
        public renderContext: WebGLRenderingContext;
        public constructor(value:WebGLRenderingContext){
            this.renderContext=value;
        }
        public upToGpu(): void {
            if (this.indexs.length) {
                this.treNum = this.indexs.length
                this.vertexBuffer = this.uploadBuff3D(this.vertices);
                this.uvBuffer = this.uploadBuff3D(this.uvs);
                this.indexBuffer = this.uploadIndexBuff3D(this.indexs);
            }
        }
        private uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer {
            var gl:WebGLRenderingContext=this.renderContext;
            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var $iBuffer: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
            if (elementArrayBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            return $iBuffer;
        }
        private uploadBuff3D($jsData: any): WebGLBuffer {
            var gl:WebGLRenderingContext=this.renderContext;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

            var $buffData: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);

            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }

            return $buffData;
        }

    }
    export class DisplayBaseShader3d   {
        public program: WebGLProgram;
        public vShader: WebGLShader;
        public fShader: WebGLShader;
        constructor() {
           
        }
        binLocation(gl: WebGLRenderingContext): void {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(1.0,0.0,1.0,1.0);\n" +
                "}"
            return $str
        }
    }
    export class DisplayBaseSprite {

        private renderContext: WebGLRenderingContext;
        private program: WebGLProgram;
        constructor(value: WebGLRenderingContext) {

            this.renderContext = value;
            this.initData()

        }
        private objData: BaseObjData;
        private initData(): void {

            var baseDiplay3dShader: DisplayBaseShader3d = new DisplayBaseShader3d()
            var gl: WebGLRenderingContext = this.renderContext;

            baseDiplay3dShader.program = gl.createProgram();
            baseDiplay3dShader.vShader = gl.createShader(gl.VERTEX_SHADER);
            baseDiplay3dShader.fShader = gl.createShader(gl.FRAGMENT_SHADER);

            gl.shaderSource(baseDiplay3dShader.vShader, baseDiplay3dShader.getVertexShaderString());
            gl.shaderSource(baseDiplay3dShader.fShader, baseDiplay3dShader.getFragmentShaderString());

            gl.compileShader(baseDiplay3dShader.vShader);
            gl.compileShader(baseDiplay3dShader.fShader);

            gl.attachShader(baseDiplay3dShader.program, baseDiplay3dShader.vShader);
            gl.attachShader(baseDiplay3dShader.program, baseDiplay3dShader.fShader);

            // baseDiplay3dShader.binLocation($context);
            gl.linkProgram(baseDiplay3dShader.program);
            this.program = baseDiplay3dShader.program;


            var info: string = gl.getProgramInfoLog(baseDiplay3dShader.program);
            var vInfo: string = gl.getShaderInfoLog(baseDiplay3dShader.vShader);
            var fInfo: string = gl.getShaderInfoLog(baseDiplay3dShader.fShader);

            this.objData = new BaseObjData(this.renderContext);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0.5);
            this.objData.vertices.push(1, 0, 0.5);
            this.objData.vertices.push(1, 1, 0.5);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.upToGpu()
        }
        public upFrame(): void {
            if (this.objData && this.objData.indexBuffer) {
                this.setProgram(this.program);
                this.setVa(0, 3, this.objData.vertexBuffer);
                this.setVa(1, 2, this.objData.uvBuffer);
                this.drawCall(this.objData.indexBuffer, this.objData.treNum);
                console.log("upFrame");
            }
        }
        private drawCall($iBuffer: WebGLBuffer, $numTri: number) {
            var gl:WebGLRenderingContext=this.renderContext;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
        }

        private setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void {
            var gl:WebGLRenderingContext=this.renderContext;
            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);

        }
        private setProgram($program: WebGLProgram): void {
            var gl:WebGLRenderingContext=this.renderContext;
            gl.useProgram($program);

        }



    }
}
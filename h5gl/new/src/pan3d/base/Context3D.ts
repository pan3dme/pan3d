module Pan3d {
    export class Context3D {
    
       
        private _ctx: CanvasRenderingContext2D;
        private _canvas: any;
       
        public webGlRender: WebGLRenderingContext;
        public constructor(value: WebGLRenderingContext) {
            this.webGlRender = value;
            this._canvas = document.createElement("canvas");
            this._canvas.style.zIndex = "3";
            this._canvas.width = 200;
            this._canvas.height = 200;
            this._canvas.style.left = 200;
            this._canvas.style.top = 300;
            this._ctx = this._canvas.getContext("2d");
            this._ctx.textBaseline = TextAlign.TOP;
        }
        public getContext2D($width: number, $height: number, alianDefault: boolean = true): CanvasRenderingContext2D {
            this._canvas.width = $width;
            this._canvas.height = $height;
            this._ctx.clearRect(0, 0, $width, $height);
            alianDefault = true
            if (alianDefault) {
                this._ctx.textBaseline = TextAlign.TOP;
                this._ctx.textAlign = TextAlign.LEFT;
            }
            return this._ctx;
        }
        public getTexture($img: any, $wrap: number = 0, $filter: number = 0, $mipmap: number = 0): WebGLTexture {
            var gl: WebGLRenderingContext = this.webGlRender;
            var $textureRect: Rectangle = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
            if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
                //console.log("图片尺寸不为2幂")
                //alert("图片尺寸不为2幂")
                var $ctx = this.getContext2D($textureRect.width, $textureRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $textureRect.width, $textureRect.height);
                return this.getTexture($ctx.canvas, 0, 0)
            }
            var textureObject: WebGLTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textureObject);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, $img);

            var filterNum: number;
            if ($filter == 0) {
                filterNum = gl.LINEAR;
            } else {
                filterNum = gl.NEAREST;
            }

            var mipNum: number;
            if ($filter == 0) {
                if ($mipmap == 0) {
                    mipNum = gl.LINEAR;
                } else if ($mipmap == 1) {
                    mipNum = gl.LINEAR_MIPMAP_LINEAR;

                } else if ($mipmap == 2) {
                    mipNum = gl.LINEAR_MIPMAP_NEAREST;
                }
            } else {
                if ($mipmap == 0) {
                    mipNum = gl.NEAREST;
                } else if ($mipmap == 1) {
                    mipNum = gl.NEAREST_MIPMAP_LINEAR;
                } else if ($mipmap == 2) {
                    mipNum = gl.NEAREST_MIPMAP_NEAREST;
                }
            }
 
 
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterNum);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipNum);

            if ($wrap == 0) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }

            if ($mipmap != 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
         
            return textureObject;
        }
        public pushVa(dataBuffer: WebGLBuffer): boolean {
            var gl: WebGLRenderingContext = this.webGlRender;
            if (gl.getParameter(gl.ARRAY_BUFFER_BINDING) == dataBuffer) {
                return true
            } else {
                gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
                return false
            }
        }
        public setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.enableVertexAttribArray(dataId);
       
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, stride, offset);
        }
        
        public setBaseRender():void
        {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clearColor(60 / 255, 60 / 255, 60/ 255, 1.0);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            gl.disable(gl.CULL_FACE);
        }
        public drawCall($iBuffer: WebGLBuffer, $numTri: number) {
            var gl:WebGLRenderingContext=this.webGlRender;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
        }
        public drawLine($iBuffer: WebGLBuffer, $numTri: number): void {
            var gl:WebGLRenderingContext=this.webGlRender;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.LINES, $numTri, gl.UNSIGNED_SHORT, 0);
        }

        public setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void {
            var gl:WebGLRenderingContext=this.webGlRender;
            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);

        }
        public setProgram($program: WebGLProgram): void {
            var gl:WebGLRenderingContext=this.webGlRender;
            gl.useProgram($program);

        }
        public uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer {
            var gl: WebGLRenderingContext = this.webGlRender;
            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var $iBuffer: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
            if (elementArrayBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            return $iBuffer;
        }
        public uploadBuff3D($jsData: any): WebGLBuffer {
            var gl: WebGLRenderingContext = this.webGlRender;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

            var $buffData: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);

            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }

            return $buffData;
        } 
        public getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation {
            return this.webGlRender.getUniformLocation($program, $name);
        }
        public setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array) {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.uniformMatrix3fv($program.getWebGLUniformLocation($name), false, $m);
        }
        public setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array) {
            this.webGlRender.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
        }
        public setVc4fv($program: Shader3D, $name: string, $m: any) {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.uniform4fv($program.getWebGLUniformLocation($name), $m);
        }
        public setVc3fv($program: Shader3D, $name: string, $m: any) {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.uniform3fv($program.getWebGLUniformLocation($name), $m);
        }
        public setVc2fv($program: Shader3D, $name: string, $m: any) {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.uniform2fv($program.getWebGLUniformLocation($name), $m);
        }
        public setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test: boolean = true) {
            var gl: WebGLRenderingContext = this.webGlRender;
            if ($level == 0) {
                gl.activeTexture(gl.TEXTURE0);
            } else if ($level == 1) {
                gl.activeTexture(gl.TEXTURE1);
            } else if ($level == 2) {
                gl.activeTexture(gl.TEXTURE2);
            } else if ($level == 3) {
                gl.activeTexture(gl.TEXTURE3);
            } else if ($level == 4) {
                gl.activeTexture(gl.TEXTURE4);
            } else if ($level == 5) {
                gl.activeTexture(gl.TEXTURE5);
            } else if ($level == 6) {
                gl.activeTexture(gl.TEXTURE6);
            }
            gl.bindTexture(gl.TEXTURE_2D, $textureObject);
            gl.uniform1i($program.getWebGLUniformLocation($name), $level);
        }

        public cullFaceBack(tf: boolean): void {
 
            var gl: WebGLRenderingContext = this.webGlRender;
            if (tf) { //反面渲染
                gl.enable(gl.CULL_FACE);
                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.FRONT) {
                    gl.cullFace(gl.FRONT);
                }
    
            } else { //正面渲染
                gl.enable(gl.CULL_FACE);
                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.BACK) {
                    gl.cullFace(gl.BACK);
                  
                }
            }
           
      
        }
        public disableCullFace():void
        {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.disable(gl.CULL_FACE);
        }
        public uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer {
            var gl: WebGLRenderingContext = this.webGlRender;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            var $buffData: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, $jsData, gl.STATIC_DRAW);
            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }
            return $buffData;
        }
        public clearVa(dataId: number): void {
 
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.disableVertexAttribArray(dataId);
        }
        public setWriteDepth(tf: boolean): void {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.depthMask(tf);
        }
        public    setDepthTest(tf:boolean ):void
        {
            var gl: WebGLRenderingContext = this.webGlRender;
            if(tf){
                gl.enable(gl.DEPTH_TEST);
            }else
            {
                gl.disable(gl.DEPTH_TEST);
            }
        }
      
        public setBlendParticleFactors(type: number): void {
            
            var gl: WebGLRenderingContext = this.webGlRender;

            switch (type) {
                case 0:
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                    break;
                case 1:
                    gl.blendFunc(gl.ONE, gl.ONE);
                    break;
                case 2:
                    gl.blendFunc(gl.DST_COLOR, gl.ZERO);
                    break;
                case 3:
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
                    break;
                case 4:
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                    break;
                case -1:
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    break;
            }
        }
      
    }
}
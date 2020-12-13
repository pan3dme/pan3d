module Pan3d {
    export class Context3D {

        public webGlRender: WebGLRenderingContext;
        public constructor(value: WebGLRenderingContext) {
            this.webGlRender = value;
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
    
        public setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array) {
            this.webGlRender.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
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
      
    }
}
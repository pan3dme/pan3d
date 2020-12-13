module Pan3d {
    export class Context3D {

        public webGlRender: WebGLRenderingContext;
        public constructor(value: WebGLRenderingContext) {
            this.webGlRender = value;
        }
        public uploadBuff3D($iStrData: number[]): WebGLBuffer {
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
        public getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation {
            return this.webGlRender.getUniformLocation($program, $name);
        }
        public setProgram($program: WebGLProgram): void {
            this.webGlRender.useProgram($program);
        }
        public setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array) {
            this.webGlRender.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
        }
        public setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);

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
        public drawCall($iBuffer: WebGLBuffer, $numTri: number) {
            var gl: WebGLRenderingContext = this.webGlRender;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);

        }
    }
}
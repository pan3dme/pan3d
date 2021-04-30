var Pan3d;
(function (Pan3d) {
    var Context3D = /** @class */ (function () {
        function Context3D(value) {
            this.webGlRender = value;
            this._canvas = document.createElement("canvas");
            this._canvas.style.zIndex = "3";
            this._canvas.width = 200;
            this._canvas.height = 200;
            this._canvas.style.left = 200;
            this._canvas.style.top = 300;
            this._ctx = this._canvas.getContext("2d");
            this._ctx.textBaseline = Pan3d.TextAlign.TOP;
        }
        Context3D.prototype.getContext2D = function ($width, $height, alianDefault) {
            if (alianDefault === void 0) { alianDefault = true; }
            this._canvas.width = $width;
            this._canvas.height = $height;
            this._ctx.clearRect(0, 0, $width, $height);
            alianDefault = true;
            if (alianDefault) {
                this._ctx.textBaseline = Pan3d.TextAlign.TOP;
                this._ctx.textAlign = Pan3d.TextAlign.LEFT;
            }
            return this._ctx;
        };
        Context3D.prototype.getTexture = function ($img, $wrap, $filter, $mipmap) {
            if ($wrap === void 0) { $wrap = 0; }
            if ($filter === void 0) { $filter = 0; }
            if ($mipmap === void 0) { $mipmap = 0; }
            var gl = this.webGlRender;
            var $textureRect = new Pan3d.Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
            if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
                //console.log("图片尺寸不为2幂")
                //alert("图片尺寸不为2幂")
                var $ctx = this.getContext2D($textureRect.width, $textureRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $textureRect.width, $textureRect.height);
                return this.getTexture($ctx.canvas, 0, 0);
            }
            var textureObject = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textureObject);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, $img);
            var filterNum;
            if ($filter == 0) {
                filterNum = gl.LINEAR;
            }
            else {
                filterNum = gl.NEAREST;
            }
            var mipNum;
            if ($filter == 0) {
                if ($mipmap == 0) {
                    mipNum = gl.LINEAR;
                }
                else if ($mipmap == 1) {
                    mipNum = gl.LINEAR_MIPMAP_LINEAR;
                }
                else if ($mipmap == 2) {
                    mipNum = gl.LINEAR_MIPMAP_NEAREST;
                }
            }
            else {
                if ($mipmap == 0) {
                    mipNum = gl.NEAREST;
                }
                else if ($mipmap == 1) {
                    mipNum = gl.NEAREST_MIPMAP_LINEAR;
                }
                else if ($mipmap == 2) {
                    mipNum = gl.NEAREST_MIPMAP_NEAREST;
                }
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterNum);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipNum);
            if ($wrap == 0) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            }
            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
            if ($mipmap != 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            return textureObject;
        };
        Context3D.prototype.pushVa = function (dataBuffer) {
            var gl = this.webGlRender;
            if (gl.getParameter(gl.ARRAY_BUFFER_BINDING) == dataBuffer) {
                return true;
            }
            else {
                gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
                return false;
            }
        };
        Context3D.prototype.setVaOffset = function (dataId, dataWidth, stride, offset) {
            var gl = this.webGlRender;
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, stride, offset);
        };
        Context3D.prototype.setBaseRender = function () {
            var gl = this.webGlRender;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clearColor(60 / 255, 60 / 255, 60 / 255, 1.0);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            gl.disable(gl.CULL_FACE);
        };
        Context3D.prototype.drawCall = function ($iBuffer, $numTri) {
            var gl = this.webGlRender;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
        };
        Context3D.prototype.drawLine = function ($iBuffer, $numTri) {
            var gl = this.webGlRender;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.LINES, $numTri, gl.UNSIGNED_SHORT, 0);
        };
        Context3D.prototype.setVa = function (dataId, dataWidth, dataBuffer) {
            var gl = this.webGlRender;
            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);
        };
        Context3D.prototype.setProgram = function ($program) {
            var gl = this.webGlRender;
            gl.useProgram($program);
        };
        Context3D.prototype.uploadIndexBuff3D = function ($iStrData) {
            var gl = this.webGlRender;
            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var $iBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
            if (elementArrayBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            return $iBuffer;
        };
        Context3D.prototype.uploadBuff3D = function ($jsData) {
            var gl = this.webGlRender;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            var $buffData = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);
            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }
            return $buffData;
        };
        Context3D.prototype.getLocation = function ($program, $name) {
            return this.webGlRender.getUniformLocation($program, $name);
        };
        Context3D.prototype.setVcMatrix3fv = function ($program, $name, $m) {
            var gl = this.webGlRender;
            gl.uniformMatrix3fv($program.getWebGLUniformLocation($name), false, $m);
        };
        Context3D.prototype.setVcMatrix4fv = function ($program, $name, $m) {
            this.webGlRender.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
        };
        Context3D.prototype.setVc4fv = function ($program, $name, $m) {
            var gl = this.webGlRender;
            gl.uniform4fv($program.getWebGLUniformLocation($name), $m);
        };
        Context3D.prototype.setVc3fv = function ($program, $name, $m) {
            var gl = this.webGlRender;
            gl.uniform3fv($program.getWebGLUniformLocation($name), $m);
        };
        Context3D.prototype.setVc2fv = function ($program, $name, $m) {
            var gl = this.webGlRender;
            gl.uniform2fv($program.getWebGLUniformLocation($name), $m);
        };
        Context3D.prototype.setRenderTextureCube = function ($program, $name, $textureObject, $level) {
            var gl = this.webGlRender;
            if ($level == 0) {
                gl.activeTexture(gl.TEXTURE0);
            }
            else if ($level == 1) {
                gl.activeTexture(gl.TEXTURE1);
            }
            else if ($level == 2) {
                gl.activeTexture(gl.TEXTURE2);
            }
            else if ($level == 3) {
                gl.activeTexture(gl.TEXTURE3);
            }
            else if ($level == 4) {
                gl.activeTexture(gl.TEXTURE4);
            }
            else if ($level == 5) {
                gl.activeTexture(gl.TEXTURE5);
            }
            else if ($level == 6) {
                gl.activeTexture(gl.TEXTURE6);
            }
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, $textureObject);
            gl.uniform1i(gl.getUniformLocation($program, $name), $level);
        };
        Context3D.prototype.setRenderTexture = function ($program, $name, $textureObject, $level, test) {
            if (test === void 0) { test = true; }
            var gl = this.webGlRender;
            if ($level == 0) {
                gl.activeTexture(gl.TEXTURE0);
            }
            else if ($level == 1) {
                gl.activeTexture(gl.TEXTURE1);
            }
            else if ($level == 2) {
                gl.activeTexture(gl.TEXTURE2);
            }
            else if ($level == 3) {
                gl.activeTexture(gl.TEXTURE3);
            }
            else if ($level == 4) {
                gl.activeTexture(gl.TEXTURE4);
            }
            else if ($level == 5) {
                gl.activeTexture(gl.TEXTURE5);
            }
            else if ($level == 6) {
                gl.activeTexture(gl.TEXTURE6);
            }
            gl.bindTexture(gl.TEXTURE_2D, $textureObject);
            gl.uniform1i($program.getWebGLUniformLocation($name), $level);
        };
        Context3D.prototype.cullFaceBack = function (tf) {
            var gl = this.webGlRender;
            if (tf) { //反面渲染
                gl.enable(gl.CULL_FACE);
                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.FRONT) {
                    gl.cullFace(gl.FRONT);
                }
            }
            else { //正面渲染
                gl.enable(gl.CULL_FACE);
                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.BACK) {
                    gl.cullFace(gl.BACK);
                }
            }
        };
        Context3D.prototype.disableCullFace = function () {
            var gl = this.webGlRender;
            gl.disable(gl.CULL_FACE);
        };
        Context3D.prototype.uploadBuff3DArrayBuffer = function ($jsData) {
            var gl = this.webGlRender;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            var $buffData = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, $jsData, gl.STATIC_DRAW);
            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }
            return $buffData;
        };
        Context3D.prototype.clearVa = function (dataId) {
            var gl = this.webGlRender;
            gl.disableVertexAttribArray(dataId);
        };
        Context3D.prototype.setWriteDepth = function (tf) {
            var gl = this.webGlRender;
            gl.depthMask(tf);
        };
        Context3D.prototype.setDepthTest = function (tf) {
            var gl = this.webGlRender;
            if (tf) {
                gl.enable(gl.DEPTH_TEST);
            }
            else {
                gl.disable(gl.DEPTH_TEST);
            }
        };
        Context3D.prototype.setBlendParticleFactors = function (type) {
            var gl = this.webGlRender;
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
        };
        return Context3D;
    }());
    Pan3d.Context3D = Context3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Context3D.js.map
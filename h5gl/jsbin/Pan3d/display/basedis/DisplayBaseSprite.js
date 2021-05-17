var Pan3d;
(function (Pan3d) {
    var BaseObjData = /** @class */ (function () {
        function BaseObjData(value) {
            this.vertices = new Array;
            this.uvs = new Array;
            this.indexs = new Array;
            this.treNum = 0;
            this.renderContext = value;
        }
        BaseObjData.prototype.upToGpu = function () {
            if (this.indexs.length) {
                this.treNum = this.indexs.length;
                this.vertexBuffer = this.uploadBuff3D(this.vertices);
                this.uvBuffer = this.uploadBuff3D(this.uvs);
                this.indexBuffer = this.uploadIndexBuff3D(this.indexs);
            }
        };
        BaseObjData.prototype.uploadIndexBuff3D = function ($iStrData) {
            var gl = this.renderContext;
            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var $iBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
            if (elementArrayBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            return $iBuffer;
        };
        BaseObjData.prototype.uploadBuff3D = function ($jsData) {
            var gl = this.renderContext;
            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            var $buffData = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);
            if (arrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
            }
            return $buffData;
        };
        return BaseObjData;
    }());
    Pan3d.BaseObjData = BaseObjData;
    var DisplayBaseShader3d = /** @class */ (function () {
        function DisplayBaseShader3d() {
        }
        DisplayBaseShader3d.prototype.binLocation = function (gl) {
            gl.bindAttribLocation(this.program, 0, "v3Position");
            gl.bindAttribLocation(this.program, 1, "u2Texture");
        };
        DisplayBaseShader3d.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        DisplayBaseShader3d.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =vec4(1.0,0.0,1.0,1.0);\n" +
                "}";
            return $str;
        };
        return DisplayBaseShader3d;
    }());
    Pan3d.DisplayBaseShader3d = DisplayBaseShader3d;
    var DisplayBaseSprite = /** @class */ (function () {
        function DisplayBaseSprite(value) {
            this.renderContext = value;
            this.initData();
        }
        DisplayBaseSprite.prototype.initData = function () {
            var baseDiplay3dShader = new DisplayBaseShader3d();
            var gl = this.renderContext;
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
            var info = gl.getProgramInfoLog(baseDiplay3dShader.program);
            var vInfo = gl.getShaderInfoLog(baseDiplay3dShader.vShader);
            var fInfo = gl.getShaderInfoLog(baseDiplay3dShader.fShader);
            this.objData = new BaseObjData(this.renderContext);
            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0.5);
            this.objData.vertices.push(1, 0, 0.5);
            this.objData.vertices.push(1, 1, 0.5);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.upToGpu();
        };
        DisplayBaseSprite.prototype.upFrame = function () {
            if (this.objData && this.objData.indexBuffer) {
                this.setProgram(this.program);
                this.setVa(0, 3, this.objData.vertexBuffer);
                this.setVa(1, 2, this.objData.uvBuffer);
                this.drawCall(this.objData.indexBuffer, this.objData.treNum);
                console.log("upFrame");
            }
        };
        DisplayBaseSprite.prototype.drawCall = function ($iBuffer, $numTri) {
            var gl = this.renderContext;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
        };
        DisplayBaseSprite.prototype.setVa = function (dataId, dataWidth, dataBuffer) {
            var gl = this.renderContext;
            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
            gl.enableVertexAttribArray(dataId);
            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);
        };
        DisplayBaseSprite.prototype.setProgram = function ($program) {
            var gl = this.renderContext;
            gl.useProgram($program);
        };
        return DisplayBaseSprite;
    }());
    Pan3d.DisplayBaseSprite = DisplayBaseSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DisplayBaseSprite.js.map
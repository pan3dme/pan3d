
module Pan3d {
    export class LightDisplay3DShader extends Shader3D {
        static LightDisplay3DShader: string = "LightDisplay3DShader";

        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");

        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "attribute vec2 lightPosition;" +

                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform vec4 uvtx;\n" +
                "varying vec2 v_texCoord;" +
                "varying vec2 v_lightCoord;" +
                "varying vec4 v_uvtx;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   v_lightCoord = vec2(lightPosition.x, lightPosition.y);" +
                "   v_uvtx = uvtx;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = vpMatrix3D * vt0;" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform sampler2D l_texture;\n" +


                "varying vec2 v_texCoord;" +
                "varying vec2 v_lightCoord;" +
                "varying vec4 v_uvtx;" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "vec4 lightUv = texture2D(l_texture, v_lightCoord.xy*v_uvtx.xy+v_uvtx.zw);\n" +

                "gl_FragColor =infoUv*lightUv*2.0 ;\n" +
                "}"
            return $str

        }

    }

    export class LightDisplay3DSprite extends Display3DSprite {

        constructor(value: Scene3D) {
            super(value);
            this.scene3D.progrmaManager.registe(LightDisplay3DShader.LightDisplay3DShader, new LightDisplay3DShader(this.scene3D));
        }
        public setFrameNodeUrl($vo: FrameNodeVo): void {

            var $dis: Display3DSprite = new Display3DSprite(this.scene3D);
            this.setObjUrl($vo.resurl)
            this.setPicUrl($vo.materialInfoArr[0].url)
            this.setLightMapUrl($vo.lighturl)

            this.shader3D = this.scene3D.progrmaManager.getProgram(LightDisplay3DShader.LightDisplay3DShader);

        }
        private setLightMapUrl(lighturl: string) {
            throw new Error("Method not implemented.");
        }
        public uxtxData: Float32Array = new Float32Array([1, 1, 0, 0])
        public update(): void {

            if (this.objData && this.objData.indexBuffer && this.sceneVisible) {
                var ctx: Context3D = this.scene3D.context3D;

                ctx.setProgram(this.shader3D.program);

                ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.cam3D.viewMatrix.m);
                ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
                ctx.setVc4fv(this.shader3D, "uvtx", this.uxtxData);

                ctx.webGlRender.bindBuffer(ctx.webGlRender.ARRAY_BUFFER, this.objData.vertexBuffer);

                ctx.setVaOffset(0, 3, this.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
                // ctx.setRenderTexture(this.shader3D, "s_texture", this.baseTexture.texture, 0);
                // ctx.setRenderTexture(this.shader3D, "l_texture", this.lightMapTextureRes.texture, 2);

                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);



            }
        }


    }
}

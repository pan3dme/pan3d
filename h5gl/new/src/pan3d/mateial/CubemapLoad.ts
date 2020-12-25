module Pan3d {
    export class CubemapLoad {
        private ary: Array<WebGLTexture> = new Array(6);
        private fun: Function;
        private flagNum: number = 0;
        public loadCube($url: string, $fun: Function,scene3d:Scene3D): void {
            this.fun = $fun;
            for (var i: number = 0; i < 6; i++) {
                var itemUrl: string = $url + "0" + (i + 1) + ".jpg";
                console.log(itemUrl)
                LoadManager.getInstance().load(itemUrl, LoadManager.IMG_TYPE, ($img: any, $info: any) => { this.loadCom($img, $info,scene3d) }, { "id": i });

            }
        }
        public static makeTempCubeTextture($img: HTMLImageElement,gl:WebGLRenderingContext): WebGLTexture {
            var wh: number = $img.width / 4;

            var canvas: any = document.createElement("canvas");
            var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            canvas.width = wh;
            canvas.height = wh;

            var renderContext: WebGLRenderingContext = gl;
            var texture: WebGLTexture = renderContext.createTexture();
            renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);

            ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh);//right
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh);//left
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh);//top
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh);//bottom
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh);//front
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh);//back
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);

            return texture
        }
        public loadCom($img: HTMLImageElement, $info: any,scene3D:Scene3D): void {



            this.ary[$info.id] = CubemapLoad.makeTempCubeTextture($img,scene3D.context3D.webGlRender);

            this.flagNum++;

            if (this.flagNum == 6) {
                this.fun(this.ary);
            }


        }
    }
}
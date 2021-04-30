var Pan3d;
(function (Pan3d) {
    var CubemapLoad = /** @class */ (function () {
        function CubemapLoad() {
            this.ary = new Array(6);
            this.flagNum = 0;
        }
        CubemapLoad.prototype.loadCube = function ($url, $fun, scene3d) {
            var _this = this;
            this.fun = $fun;
            for (var i = 0; i < 6; i++) {
                var itemUrl = $url + "0" + (i + 1) + ".jpg";
                console.log(itemUrl);
                Pan3d.LoadManager.getInstance().load(itemUrl, Pan3d.LoadManager.IMG_TYPE, function ($img, $info) { _this.loadCom($img, $info, scene3d); }, { "id": i });
            }
        };
        CubemapLoad.makeTempCubeTextture = function ($img, gl) {
            var wh = $img.width / 4;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = wh;
            canvas.height = wh;
            var renderContext = gl;
            var texture = renderContext.createTexture();
            renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);
            ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh); //right
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh); //left
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh); //top
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh); //bottom
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh); //front
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh); //back
            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
            return texture;
        };
        CubemapLoad.prototype.loadCom = function ($img, $info, scene3D) {
            this.ary[$info.id] = CubemapLoad.makeTempCubeTextture($img, scene3D.context3D.webGlRender);
            this.flagNum++;
            if (this.flagNum == 6) {
                this.fun(this.ary);
            }
        };
        return CubemapLoad;
    }());
    Pan3d.CubemapLoad = CubemapLoad;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=CubemapLoad.js.map


module Pan3d {
    export class TextureManager extends ResGC {
        private _loadDic: Object;
        private _resDic: Object;
        public constructor(value: Scene3D) {
            super(value);
            this._loadDic = new Object();
            this._resDic = new Object();
        }
        public getTexture($url: string, $fun: Function, $wrapType: number = 0, $info: any = null, $filteType: number = 0, $mipmapType: number = 0): void {

            if (this.dic[$url]) {
                if ($info) {
                    $fun(this.dic[$url], $info);
                } else {
                    $fun(this.dic[$url]);
                }
                this.dic[$url].useNum++;
                return;
            }

            var textureLoad: TextureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
            if (this._loadDic[$url]) {
                var ary: Array<TextureLoad> = this._loadDic[$url];
                ary.push(textureLoad);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(textureLoad);

            if (this._resDic[$url]) {
                this.loadTextureCom(this._resDic[$url], textureLoad);
                delete this._resDic[$url];
            } else {
                LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, ($img: any, _info: TextureLoad) => {
                    this.loadTextureCom($img, _info);
                }, textureLoad);
            }

        }
        public addRes($url: string, $img: any): void {
            if (!this.dic[$url] && !this._resDic[$url]) {
                console.log("addRes",$url);
                this._resDic[$url] = $img;
            }
        }
        public loadTextureCom($img: any, _info: TextureLoad): void {
            var context3D: Context3D = this.scene3D.context3D;
            var texture: WebGLTexture = context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);

            var textres: TextureRes = new TextureRes(this.scene3D);
            textres.texture = texture;
            textres.width = $img.width;
            textres.height = $img.height;
            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(textres, ary[i].info);
                } else {
                    ary[i].fun(textres);
                }

            }
            delete this._loadDic[_info.url];
            this.dic[_info.url] = textres;
        }


    }

}
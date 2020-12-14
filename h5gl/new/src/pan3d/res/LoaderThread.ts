module Pan3d {
    

    export class LoaderThread {
        private _xhr: XMLHttpRequest;
        private _img: any;
        private _loadInfo: LoadInfo;

        public idle: boolean;
        private _url: string;
        constructor() {
            this._xhr = new XMLHttpRequest();

            this._xhr.onreadystatechange = () => {
                if (!this._xhr || this._xhr.readyState !== 4) {
                    return;
                }
                if (this._xhr.status !== 0 && this._xhr.status !== 200) {
                    this.loadError();
                    return;
                }
                this.loadByteXML();
            }
            this._xhr.onprogress = (e: ProgressEvent) => {
                if (this._loadInfo.progressFun) {
                    this._loadInfo.progressFun(e.loaded / e.total);
                }
            }
            this._xhr.onerror = () => {
                this.loadError();
            }

            this._img =  makeImage()
            this._img.onload = () => {
                this.loadImg();
            }

            this._img.onerror = () => {
                this.loadError();
            }

            this.idle = true;
        }
       

        public load(loadInfo: LoadInfo): void {
            this._loadInfo = loadInfo;
            this.idle = false;
            this._url = loadInfo.url;

            if (this._loadInfo.type == LoadManager.BYTE_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "arraybuffer";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.XML_TYPE) {
                this._xhr.open("GET", loadInfo.vurl, true);
                this._xhr.responseType = "text";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.IMG_TYPE) {
                if (this._img.url == loadInfo.vurl) {//路径相同
                    this.loadImg();
                } else {//执行加载
                    this._img.url = loadInfo.vurl;
                    this._img.src = loadInfo.vurl;
                }

            }


        }

        public loadError(): void {
    
            if (this._loadInfo.info && this._loadInfo.info.errorFun) {
                this._loadInfo.info.errorFun(); 
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        }

        public loadByteXML(): void {
            // if(this.idle){
            //     //console.log("加载完成*****************************"+this._url );
            // }
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._xhr.response, this._loadInfo.info);
            } else {
                this._loadInfo.fun(this._xhr.response);
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();

        }

        public loadByteImg(): void {
            this._img.src = 'data:image/png;base64,' +  Base64.encode(this._xhr.response);
        }

        public loadImg(): void {
            if (this._loadInfo.info) {
                this._loadInfo.fun(this._img, this._loadInfo.info);
            } else {
                this._loadInfo.fun(this._img);
            }
            this.idle = true;
            this._loadInfo = null;
            LoadManager.getInstance().loadWaitList();
        }

    }
 
}




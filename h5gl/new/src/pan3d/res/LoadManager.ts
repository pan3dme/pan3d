module Pan3d {
    export class LoadManager {
        public static BYTE_TYPE: string = "BYTE_TYPE";
        public static IMG_TYPE: string = "IMG_TYPE";
        public static XML_TYPE: string = "XML_TYPE";

        private static _instance: LoadManager;
        public static getInstance(): LoadManager {
            if (!this._instance) {
                this._instance = new LoadManager();
            }
            return this._instance;
        }

        static getVersion(vkey): string {
            return ""
        }

        private _loadThreadList: Array<LoaderThread>;
        private _waitLoadList: Array<LoadInfo>;
        constructor() {
            this._loadThreadList = new Array;
            this._waitLoadList = new Array;

            for (var i: number = 0; i < 10; i++) {
                this._loadThreadList.push(new LoaderThread());
            }
        }

        public load($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null): void {
      
            if (!$url || $url.length < 1 || $url.search("undefined") != -1) {
                //console.log("加载地址不能为空")
                return;
            }


            var version: string ="0"
     

            //GameInstance.mapName


            var loadInfo: LoadInfo = new LoadInfo($url, $type, $fun, $info, $progressFun);
            loadInfo.version = version;

            for (var i: number = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(loadInfo);
                    return;
                }
            }

            this._waitLoadList.push(loadInfo);

        }

        public loadWaitList() {
            if (this._waitLoadList.length <= 0) {
                return;
            }

            for (var i: number = 0; i < this._loadThreadList.length; i++) {
                if (this._loadThreadList[i].idle) {
                    this._loadThreadList[i].load(this._waitLoadList.shift());
                    return;
                }
            }

        }



    }
 

    
}




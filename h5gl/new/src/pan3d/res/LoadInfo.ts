module Pan3d {
     
    export class LoadInfo {

        public url: string;

        public type: string;

        public fun: Function;

        public info: any;

        public progressFun: Function;

        public version: string;

        constructor($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null) {
            this.url = $url;
            this.type = $type;
            this.fun = $fun;
            this.info = $info;
            this.progressFun = $progressFun;
        }
        public get vurl(): string {
            return this.url 
        }
    }
}




module Pan3d {
    export class TextureLoad {
        public fun: Function;
        public info: any;
        public url: string;
        public wrap: number;
        public filter: number;
        public mipmap: number;

        constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number) {
            this.fun = $fun;
            this.info = $info;
            this.url = $url;
            this.wrap = $wrap;
            this.filter = $filter;
            this.mipmap = $mipmap;
        }
    }
}
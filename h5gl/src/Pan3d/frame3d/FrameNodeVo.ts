module Pan3d {

    export class FrameNodeVo {
        constructor() {
        }
        public type: number;
        public id: number;
        public name: number;
        public url: string;
        public resurl: string;

        public noLight: boolean;
        public directLight: boolean;
        public receiveShadow: boolean;
        public lighturl: string

        public pointitem: Array<FrameLinePointVo>;
        public materialInfoArr: Array<any>;

        public materialurl: string

        public writeObject($obj: any): void {

            this.id = $obj.id;
            this.name = $obj.name;
            this.url = $obj.url;


            this.pointitem = new Array
            for (var j: number = 0; j < $obj.pointitem.length; j++) {
                var $FrameLinePointVo: FrameLinePointVo = new FrameLinePointVo();
                $FrameLinePointVo.writeObject($obj.pointitem[j])
                this.pointitem.push($FrameLinePointVo)
            }
            this.resurl = $obj.resurl
            if (this.url.search(".prefab") != -1) {
                this.materialInfoArr = new Array
                for (var i: number = 0; $obj.materialInfoArr && i < $obj.materialInfoArr.length; i++) {
                    this.materialInfoArr.push($obj.materialInfoArr[i])
                }
                this.noLight = $obj.noLight;
                this.directLight = $obj.directLight;
                this.receiveShadow = $obj.receiveShadow;

                if (this.noLight == false) {
                    this.lighturl = $obj.lighturl

                }
                this.materialurl = $obj.materialurl
                this.type = 1;
            }
            if (this.url.search(".lyf") != -1) {
                this.type = 2;
            }
            if (this.url.search(".zzw") != -1) {
                this.type = 3;
            }



        }



    }
}
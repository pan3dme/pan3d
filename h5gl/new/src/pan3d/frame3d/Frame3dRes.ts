module Pan3d {

    export class Frame3dRes extends BaseRes {
        private _completeFun: Function;
        public load($url: string, $completeFun: Function): void {
            this._completeFun = $completeFun;
            LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            }, null);
        }
        public static frameSpeedNum: number;
        public static sceneFileroot: string;
        public static fileName: string;
        public haveVideo: boolean
        public loadComplete($byte: ArrayBuffer): void {

            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            if (this.version >= 31) {

            }
            var $str = this._byte.readUTF();
            var $itemstr: Array<string> = $str.split("/")
            Frame3dRes.sceneFileroot = $str.replace($itemstr[$itemstr.length - 1], "")
            Frame3dRes.fileName = $itemstr[$itemstr.length - 1]


            Frame3dRes.frameSpeedNum = this._byte.readInt();
            console.log("版本", this.version, "frameSpeedNum", Frame3dRes.frameSpeedNum)


            this.readSceneInfo();


            this.read(() => { this.readNext() });//img
        }
        private toVect4($num: number): Vector3D {
            var temp: number = Math.floor(65536 * $num);
            var a: number = Math.floor(temp / 256);
            var b: number = Math.floor(temp - a * 256);
            return new Vector3D(a / 256, b / 256, 0, 1);

        }
        private toNum(vect: Vector3D): number {
            var $a: number = vect.x * 256;
            var $b: number = vect.y * 256;
            var $bnum: number = ($a * 256 + $b) / 65536
            console.log("$bnum", $bnum)
            return ($a * 256 + $b) / 65536
        }
        //收获环境参数
        private readSceneInfo(): void {
            var size: number = this._byte.readInt();
            var $obj: any = JSON.parse(this._byte.readUTFBytes(size));

            this.haveVideo = $obj.haveVideo;
            // Scene_data.light.setData($obj.SunNrm, $obj.SunLigth, $obj.AmbientLight);
            // LightBmpModel.getInstance().videoLightUvData = $obj.videoLightUvData;

        }
        public static frameNum: number = 1
        public readNext(): void {
            this.read();//obj
            this.read();//material
            this.read();//particle;
            this.readFrame3dScene()

        }
        public frameItem: Array<FrameNodeVo>
        public readFrame3dScene(): void {
            this.frameItem = new Array;
            var size: number = this._byte.readInt();
            var $scene = JSON.parse(this._byte.readUTFBytes(size));
            for (var i: number = 0; i < $scene.length; i++) {
                var $frameNodeVo: FrameNodeVo = new FrameNodeVo()
                $frameNodeVo.writeObject($scene[i])
                this.frameItem.push($frameNodeVo)
            }
            this._completeFun();
        }
    }

    export class FrameSceneChar extends SceneChar {
        private shadowShadr: Shader3D
        shadow: boolean;
        constructor(value: Scene3D) {
            super(value);

        }

    }



}
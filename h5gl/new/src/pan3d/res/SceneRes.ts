module Pan3d {
    export class SceneRes extends BaseRes {
        private _completeFun: Function;
        private _readDataFun: Function;
        protected _progressFun: Function;
        public sceneData: any;
        constructor(value: Scene3D) {
            super(value);
        }
        public load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void {
            this._completeFun = $completeFun;
            this._readDataFun = $readDataFun;
            this._progressFun = $progressFun;
            $url = this.scene3D.fileRoot + getMapUrl($url);
            LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);

            }, null, $progressFun);
        }
        private loadComplete($byte: ArrayBuffer) {
            this._byte = new Pan3dByteArray($byte);

            this._byte.position = 0;
            this.version = this._byte.readInt()
            this.read(() => { this.readNext() });//img
        }
        private readNext(): void {
            this.read();//obj
            this.read();//material
            this.read();//particle;
            this.readScene();

            this._completeFun ();

        }
        private readScene() {
            var types: number = this._byte.readInt();
            this.readAstat();
            if (this.version >= 28) {
                this.readTerrainIdInfoBitmapData(this._byte)
            }
            var size: number = this._byte.readInt();
            this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
 

        }
        private readAstat(): void {
            var hasAstat: boolean = this._byte.readBoolean();
            if (hasAstat) {


                this._byte.readFloat();
                this._byte.readFloat();
                this._byte.readFloat();
                this._byte.readFloat();
                var i: number;
                var j: number;
                var tw: number = this._byte.readInt();
                var th: number = this._byte.readInt();

                // this._astarDataMesh.width = tw;
                // this._astarDataMesh.height = th;
                if (this.version < 25) {
                    for (i = 0; i < th; i++) {
                        var tempAstar: Array<number> = new Array
                        for (j = 0; j < tw; j++) {
                            tempAstar.push(this._byte.readFloat())
                        }
                        // this._astarDataMesh.astarItem.push(tempAstar);
                    }
                    for (i = 0; i < th; i++) {
                        var tempHeightArr: Array<number> = new Array
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readFloat())
                        }
                        // this._astarDataMesh.heightItem.push(tempHeightArr);
                    }
                } else {
                    var $heightScaleNum: number = this._byte.readFloat();
                    var $astrBase: Array<number> = this.readAstarFromByte(this._byte);
                    var $jumpBase: Array<number> = this.readAstarFromByte(this._byte);

                    var $astrBaseId: number = 0;
                    var $jumpBaseId: number = 0;
                    for (i = 0; i < th; i++) {
                        var tempAstar: Array<number> = new Array;
                        var tempJump: Array<number> = new Array;
                        for (j = 0; j < tw; j++) {
                            var astarNum: number = $astrBase[$astrBaseId++]
                            tempAstar.push(astarNum);
                            if (astarNum == 1) {
                                var ssss: number = $jumpBase[$jumpBaseId++]
                                tempJump.push(ssss);
                            } else {
                                tempJump.push(0);
                            }
                        }

                    }


                    for (i = 0; i < th; i++) {
                        var tempHeightArr: Array<number> = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readShort() / $heightScaleNum);
                        }

                    }

                }
            }
        }
        private readTerrainIdInfoBitmapData($byte: Pan3dByteArray): void {
            var $len: number = $byte.readInt();
            if ($len) {
                //var newByte: ByteArray = new ByteArray();
                //newByte.length = $len;
                //$byte.readBytes(newByte, 0, $len);

                var zipLen: number = $len
                var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
                $byte.position += zipLen;
                var zipedBuf: ArrayBuffer = unZip(aryBuf)
                var newByte: Pan3dByteArray = new Pan3dByteArray(zipedBuf);


            }

        }
        private readAstarFromByte($byte: Pan3dByteArray): Array<number> {
            var $len: number = $byte.readUnsignedInt();
            var $intLen: number = Math.ceil($len / 32);
            var $astrBase: Array<number> = new Array
            for (var i: number = 0; i < $intLen; i++) {
                var $num: number = $byte.readUnsignedInt();
                for (var j: number = 0; j < 32; j++) {
                    var $ast: number = $num & 1;
                    if ($astrBase.length < $len) {
                        $astrBase.push($ast);
                    }
                    $num >>= 1;
                }
            }
            return $astrBase
        }

    }

}
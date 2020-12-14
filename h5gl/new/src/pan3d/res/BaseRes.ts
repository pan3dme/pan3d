module Pan3d {
    export class BaseRes extends ResCount {


        public static IMG_TYPE: number = 1;
        public static OBJS_TYPE: number = 2;
        public static MATERIAL_TYPE: number = 3;
        public static PARTICLE_TYPE: number = 4;
        public static SCENE_TYPE: number = 5;
        public static ZIP_OBJS_TYPE: number = 6;
        public static PREFAB_TYPE: number = 1;
        public static SCENE_PARTICLE_TYPE: number = 11;


        protected _byte: Pan3dByteArray
        protected imgNum: number;
        protected imgLoadNum: number;
        protected _imgComplete: boolean;

        //public imgAry: Array<string>;
        //public objAry: Array<string>;
        //public materialAry: Array<string>;
        //public particleAry: Array<string>;
        protected _progressFun: Function;
        //public useNum: number;
        public version: number;
        public _imgFun: Function;

        private allImgBytes: number = 10000000;

        constructor(value:Scene3D) {
            super(value);
        }

        public read($imgFun: Function = null): void {
            this._imgFun = $imgFun;
            var fileType: number = this._byte.readInt();
            if (fileType == BaseRes.IMG_TYPE) {
                if (this.scene3D.supportBlob) {
                    this.readImg();
                } else {
                    // this.readImgLow();
                }
            } else if (fileType == BaseRes.OBJS_TYPE) {
                this.readObj(this._byte);
            } else if (fileType == BaseRes.MATERIAL_TYPE) {
                this.readMaterial();
            } else if (fileType == BaseRes.PARTICLE_TYPE) {
                this.readParticle();
            } else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
                this.readZipObj();
            }

        }

        public readZipObj(): void {
            var zipLen: number = this._byte.readInt();
            var aryBuf: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + zipLen);
            this._byte.position += zipLen;
            var zipedBuf: ArrayBuffer = unZip(aryBuf)
            var newByte: Pan3dByteArray = new Pan3dByteArray(zipedBuf);
            this.readObj(newByte);
        }

        public readImg(): void {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            //this.imgAry = new Array;


            // var time: number = TimeUtil.getTimer();

            var ary: Array<Blob> = new Array;
            var urlAry: Array<string> = new Array;

            for (var i: number = 0; i < this.imgNum; i++) {
                var url: string = this.scene3D.fileRoot + this._byte.readUTF();
                var imgSize: number = this._byte.readInt();
                
            

                var imgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                this._byte.position += imgSize;


                var blob: Blob = new Blob([imgAryBuffer], { type: "application/octet-binary" });
                ary.push(blob);
                urlAry.push(url);

            }

            for (var i: number = 0; i < ary.length; i++) {
                var img: any = new Image();
                img.url = urlAry[i];
                img.onload = (evt: Event) => {
                    this.loadImg(evt.target);
                    var etimg: any = evt.target;
                    URL.revokeObjectURL(etimg.src);
                }
                img.src = URL.createObjectURL(ary[i]);
            }

        }

  
        public loadImg(img: any): void {
            // TextureManager.getInstance().addRes(img.url, img);

            this.countImg();
        }

        public addImg($url: string, img: any): void {
            // TextureManager.getInstance().addRes($url, img);

            this.countImg();
        }

        public countImg(): void {
            this.imgLoadNum++;
            if (this.imgLoadNum == this.imgNum) {
                this._imgComplete = true;
                this.allResCom();
            }
        }

        public readObj($srcByte: Pan3dByteArray): void {
            var objNum: number = $srcByte.readInt();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = this.scene3D.fileRoot + $srcByte.readUTF();
                var size: number = $srcByte.readInt();
                var newByte: Pan3dByteArray = new Pan3dByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
               var objData: ObjData = this.scene3D.objDataManager.loadObjCom(newByte.buffer, url);
            }

            if (this._imgFun) {
                this._imgFun();
            }

        }
        public readMaterial(): void {
            var objNum: number = this._byte.readInt();
            //this.materialAry = new Array;

            // var time: number = TimeUtil.getTimer();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = this.scene3D.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();

                var dataByte: Pan3dByteArray = new Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)
                // MaterialManager.getInstance().addResByte(url, dataByte);
          

            }
      
        }

        public readParticle(): void {
            var objNum: number = this._byte.readInt();
          

            for (var i: number = 0; i < objNum; i++) {
                var url: string = this.scene3D.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();


                var dataByte: Pan3dByteArray = new Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)
                // ParticleManager.getInstance().addResByte(url, dataByte);

 
            }

             
        }
        //读材质参数
        public readMaterialInfo(): Array<any> {

            var len: number = this._byte.readInt();
            if (len > 0) {
                var $arr: Array<any> = new Array
                for (var i: number = 0; i < len; i++) {
                    var $temp: any = new Object();
                    $temp.type = this._byte.readInt()
                    $temp.name = this._byte.readUTF()
                    if ($temp.type == 0) {
                        $temp.url = this._byte.readUTF()
                    }
                    if ($temp.type == 1) {
                        $temp.x = this._byte.readFloat()
                    }
                    if ($temp.type == 2) {
                        $temp.x = this._byte.readFloat()
                        $temp.y = this._byte.readFloat()
                    }
                    if ($temp.type == 3) {
                        $temp.x = this._byte.readFloat()
                        $temp.y = this._byte.readFloat()
                        $temp.z = this._byte.readFloat()
                    }

                    $arr.push($temp)
                }
                return $arr
            } else {
                return null
            }
        }
        //读取浮点数据，两个字节
        public static readFloatTwoByte(byte: Pan3dByteArray, vertices: Array<number>): void {


            var verLength: number = byte.readInt();
            if (verLength > 0) {
                var $scaleNum: number = byte.readFloat();
                vertices.length = 0
                for (var i: number = 0; i < verLength; i++) {
                    vertices.push(byte.readFloatTwoByte($scaleNum))

                }
            }

        }

        //读取一个字节的LightMap
        public static readFloatOneByte(byte: Pan3dByteArray, vertices: Array<number>): void {
            var verLength: number = byte.readInt();
            if (verLength > 0) {
                for (var i: number = 0; i < verLength; i++) {
                    vertices.push((byte.readByte() + 128) / 256)
                }
            }

        }

        public static readIntForTwoByte(byte: Pan3dByteArray, indexs: Array<number>): void {
            var iLen: number = byte.readInt();
            for (var i: number = 0; i < iLen; i++) {
                indexs.push(byte.readShort());
            }
        }

        public static readIntForOneByte(byte: Pan3dByteArray, indexs: Array<number>): void {
            var iLen: number = byte.readInt();
            for (var i: number = 0; i < iLen; i++) {
                indexs.push(byte.readByte());
            }
        }


        /**
         * $readType
         * 0 readFloatTwoByte
         * 1 readFloatOneByte
         * 2 readIntForOneByte
         *  */
        public static readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType: number = 0): void {
            var verLength: number = $byte.readInt();

            if (verLength <= 0) {
                return;
            }

            var scaleNum: number;
            if ($readType == 0) {
                scaleNum = $byte.readFloat();
            }

            var readNum: number = verLength / $dataWidth;
            for (var i: number = 0; i < readNum; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {

                    if ($readType == 0) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                    } else if ($readType == 1) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    } else if ($readType == 2) {
                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    } else if ($readType == 3) {
                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                    } else if ($readType == 4) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
                    }


                }

            }



        }



        //读取材质参数
        public static readMaterialParamData(byte: Pan3dByteArray): Array<any> {
            var mpNum: number = byte.readInt();
            if (mpNum > 0) {
                var mpAry: Array<any> = new Array;
                for (var j: number = 0; j < mpNum; j++) {
                    var obj: any = new Object;
                    obj.name = byte.readUTF();
                    obj.type = byte.readByte();
                    if (obj.type == 0) {
                        obj.url = byte.readUTF();
                    } else if (obj.type == 1) {
                        obj.x = byte.readFloat();
                    } else if (obj.type == 2) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                    } else if (obj.type == 3) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                        obj.z = byte.readFloat();
                    }
                    mpAry.push(obj);
                }
                return mpAry
            }
            return null
        }
        public allResCom(): void {
            if (this._imgFun) {
                this._imgFun();
            }
        }
    }
}
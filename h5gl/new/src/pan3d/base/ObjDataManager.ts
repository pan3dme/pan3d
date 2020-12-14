module Pan3d {
    export class ObjDataManager extends ResGC {
        private _loadList: Object;
        constructor(value:Scene3D) {
            super(value);
            this._loadList = new Object();
        }
        public getObjData($url: string, $fun: Function): void {
            if (this.dic[$url]) {
                $fun(this.dic[$url]);
                this.dic[$url].useNum++;
                return;
            }
            var ary: Array<Function>;
            if (!this._loadList[$url]) {
                this._loadList[$url] = new Array;
                LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                    this.loadObjCom($byte, $url);
                });
            }
            ary = this._loadList[$url];
            ary.push($fun);
        }
     
      
        public loadObjCom($byte: ArrayBuffer, $url: string): ObjData {
            if (this.dic[$url]) {
                return;
            }
          
            var $objData: ObjData = new ObjData(this.scene3D);
            var byte: Pan3dByteArray = new Pan3dByteArray($byte);
            var version: number = byte.readInt()

            var str: string = byte.readUTF();

            this.readObj2OneBuffer(byte, $objData);

            $objData.treNum = $objData.indexs.length;
            $objData.indexBuffer = this.scene3D.context3D.uploadIndexBuff3D($objData.indexs);
            this.dic[$url] = $objData;
            var ary: Array<Function> = this._loadList[$url];
            if (ary) {
                for (var i: number = 0; i < ary.length; i++) {
                    ary[i]($objData);
                }
                delete this._loadList[$url];
            }
            return $objData;
        }

        private readObj2OneBuffer(byte: Pan3dByteArray, $objData: ObjData): void {
 
            var typeItem: Array<boolean> = new Array;
            var len: number;

            var typeItem: Array<boolean> = new Array;
            var dataWidth: number = 0;
            for (var i: number = 0; i < 6; i++) {
                var tf: boolean = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    switch (i) {
                        case 1://uv
                            dataWidth += 2;
                            break;
                        case 2://lightuv
                            dataWidth += 2;
                            break;
                        default:
                            dataWidth += 3;
                            break;
                    }

                }

            }

            len = byte.readFloat();

            var baseLenght: number = len;

            len *= dataWidth * 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            var uvsOffsets: number = 3;
            var lightuvsOffsets: number = uvsOffsets + 2;
            var normalsOffsets: number = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
            var tangentsOffsets: number = normalsOffsets + 3;
            var bitangentsOffsets: number = tangentsOffsets + 3;

            BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth);//vertices
            BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth);//uvs
            BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1);//lightuvs
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth);//normals
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth);//tangents
            BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth);//bitangents

       

  

            BaseRes.readIntForTwoByte(byte, $objData.indexs);

            

            $objData.vertexBuffer = this.scene3D.context3D.uploadBuff3DArrayBuffer(arybuff);

            $objData.compressBuffer = true;
            $objData.uvsOffsets = uvsOffsets * 4;
            $objData.lightuvsOffsets = lightuvsOffsets * 4;
            $objData.normalsOffsets = normalsOffsets * 4;
            $objData.tangentsOffsets = tangentsOffsets * 4;
            $objData.bitangentsOffsets = bitangentsOffsets * 4;
            $objData.stride = dataWidth * 4;

      

        }

        

    }
}
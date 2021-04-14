module Pan3d {
    export class RoleRes extends BaseRes {
   
        public roleUrl: string;
        public actionAry: Array<string>;
        private _fun: Function;
        public meshBatchNum: number;

 
        public ambientLightColor: Vector3D;
        public ambientLightIntensity: number;
        public sunLigthColor: Vector3D;
        public sunLigthIntensity: number;
        public nrmDircet: Vector3D;
        constructor(value:Scene3D) {
            super(value);
        }

    
        public load(url: string, $fun: Function): void {
            this._fun = $fun;
            LoadManager.getInstance().load(url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadComplete($byte);
            });
        }

        public loadComplete($byte: ArrayBuffer): void {
            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0
            this.version = this._byte.readInt();
            this.readMesh();
        }
        public readMesh(): void {
            this.roleUrl = this._byte.readUTF();
            if (this.version >= 16) { //环境参数
                this.ambientLightColor = new Vector3D;
                this.sunLigthColor = new Vector3D;
                this.nrmDircet = new Vector3D;

                this.ambientLightColor.x = this._byte.readFloat();
                this.ambientLightColor.y = this._byte.readFloat();
                this.ambientLightColor.z = this._byte.readFloat();
                this.ambientLightIntensity = this._byte.readFloat();
                this.ambientLightColor.scaleBy(this.ambientLightIntensity);

                this.sunLigthColor.x = this._byte.readFloat();
                this.sunLigthColor.y = this._byte.readFloat();
                this.sunLigthColor.z = this._byte.readFloat();
                this.sunLigthIntensity = this._byte.readFloat();
                this.sunLigthColor.scaleBy(this.sunLigthIntensity);

                this.nrmDircet.x = this._byte.readFloat();
                this.nrmDircet.y = this._byte.readFloat();
                this.nrmDircet.z = this._byte.readFloat();
            }

            this.scene3D.meshDataManager.readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);

          

            this.readAction();
        }
        protected readAction(): void {
            
            var $actionByte: Pan3dByteArray
            if (this.version >= 30) {
                $actionByte = getZipByte(this._byte)
            } else {
                $actionByte = this._byte
            }
            this.actionAry = new Array;
            var actionNum: number = $actionByte.readInt();
            for (var i: number = 0; i < actionNum; i++) {
                var actionName: string = $actionByte.readUTF();
                this.scene3D.animManager.readData($actionByte, this.roleUrl + actionName);
                this.actionAry.push(actionName);
            }
            this.read(() => { this.readNext() });//readimg 
         

        }


        protected readNext(): void {
            this.read();//readmaterial
            this.read();//readparticle;
            this._fun();
        }
      
    }
}
module Pan3d {
    export class ResCount extends GC {
        public   scene3D:Scene3D ;
        protected _useNum: number = 0;
        public idleTime: number = 0;
        public static GCTime: number = 4;
        constructor(value:Scene3D) {
            super();
            this.scene3D=value;
        }
        public get useNum(): number {
            return this._useNum;
        }

        public set useNum(n: number) {
            this._useNum = n;
            if (this._useNum == 0) {
                this.idleTime = 0;
            }
        }

        public clearUseNum(): void {
            this._useNum--;
            if (this._useNum <= 0) {
                this.idleTime = ResCount.GCTime;
            }
        }
      
    }
}
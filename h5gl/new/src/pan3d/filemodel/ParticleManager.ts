module Pan3d {
    export class ParticleManager extends ResGC {
        private _time: number  ;
       
        public constructor(value:Scene3D)
        {
            super(value);
            this._particleList=new Array();
            this._time=TimeUtil.getTimer();
        }
     
        public getParticleByte($url: string): CombineParticle {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            var combineParticle: CombineParticle = new CombineParticle();
            var url: string = $url;
            if (this.dic[url]) {
                var baseData: CombineParticleData = this.dic[url];
                combineParticle = baseData.getCombineParticle();
            }
           
            combineParticle.url = url;
            return combineParticle;
        }
        private _particleList: Array<CombineParticle>;
        public addParticle($particle: CombineParticle): void {
          
            this._particleList.push($particle);
            this.addRenderDic($particle);
        }
        private renderDic: Object = new Object;
        private addRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;
            if (!this.renderDic[url]) {
                this.renderDic[url] = new Array;
            }

            this.renderDic[url].push($particle);

        }
        public registerUrl($url: string): void {
            $url = $url.replace("_byte.txt", ".txt")
            $url = $url.replace(".txt", "_byte.txt")
            if (this.dic[$url]) {
                var baseData: CombineParticleData = this.dic[$url];
        
            }
        }
        public addResByte($url: string, $data: Pan3dByteArray): void {
            if (!this.dic[$url]) {
                var baseData: CombineParticleData = new CombineParticleData(this.scene3D);
                baseData.setDataByte($data);
                this.dic[$url] = baseData;
            }
        }

        public upFrame(): void {
            this. updateTime();
            this. updateRenderDic();
    
        }
        public updateTime(): void {

            var _tempTime: number = TimeUtil.getTimer();
            var t: number = _tempTime - this._time;
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }
            this._time = _tempTime;

        }
        private updateRenderDic(): void {
            this.scene3D.context3D.setWriteDepth(false);
            for (var key in this.renderDic) {
                var list: Array<CombineParticle> = this.renderDic[key];
                if (list.length == 1) {
                    list[0].update();
                } else {
                    var size: number = list[0].size;

                    for (var j: number = 0; j < size; j++) {
                        for (var i: number = 0; i < list.length; i++) {
                            list[i].updateItem(j);
                        }
                    }

                }

            }
        }


        

    }
}
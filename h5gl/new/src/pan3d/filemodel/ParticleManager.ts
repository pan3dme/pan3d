module Pan3d {
    export class ParticleManager extends ResGC {
        public time: number;
        public constructor(value: Scene3D) {
            super(value);
            this.clearAll();
            this.time = TimeUtil.getTimer();
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
        private _renderDic: Object = new Object;
        public addParticle($particle: CombineParticle): void {

            this._particleList.push($particle);
            this.addRenderDic($particle);
        }
        public clearAll() {
            this._particleList = new Array()
            this._renderDic = new Object()
        }

        private addRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;
            if (!this._renderDic[url]) {
                this._renderDic[url] = new Array;
            }

            this._renderDic[url].push($particle);

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
        public removeParticle($particle: CombineParticle): void {
            var indexs: number = this._particleList.indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._particleList.splice(indexs, 1);
            this.removeRenderDic($particle);

        }
        private removeRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;

            var indexs: number = this._renderDic[url].indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._renderDic[url].splice(indexs, 1);
            if (this._renderDic[url].length == 0) {
                delete this._renderDic[url];
            }
        }
        public upFrame(): void {
            this.updateTime();
            this.updateRenderDic();

        }
        public updateTime(): void {

            var _tempTime: number = TimeUtil.getTimer();
            var t: number = _tempTime - this.time;
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }
            this.time = _tempTime;

        }
        private updateRenderDic(): void {
            this.scene3D.context3D.setWriteDepth(false);
            this.scene3D.context3D.disableCullFace();
            for (var key in this._renderDic) {
                var list: Array<CombineParticle> = this._renderDic[key];
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
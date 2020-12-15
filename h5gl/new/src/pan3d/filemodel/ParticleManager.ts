module Pan3d {
    export class ParticleManager extends ResGC {
       
        public constructor(value:Scene3D)
        {
            super(value);
            this._particleList=new Array();
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


    }
}
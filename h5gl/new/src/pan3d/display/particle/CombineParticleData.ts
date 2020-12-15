module Pan3d {
    export class CombineParticleData extends ResCount {
        public maxTime: number;
        public dataAry: Array<ParticleData>;
        public getCombineParticle(): CombineParticle {
            var particle: CombineParticle = new CombineParticle();
            particle.maxTime = this.maxTime;

            for (var i: number = 0; i < this.dataAry.length; i++) {
                var display: Display3DParticle = this.dataAry[i].creatPartilce();
                particle.addPrticleItem(display);
            }

            particle.sourceData = this;
 

            return particle;
        }
    }
}
module Pan3d {
    export class ParticleData {
        public version: number;
        public creatPartilce(): Display3DParticle {

            var particle: Display3DParticle = this.getParticle();

            /*
            particle.data = this;
            var tl: TimeLine = new TimeLine();
            tl.setAllDataInfo(this.timelineData);
            particle.setTimeLine(tl);

            particle.onCreated();
            */

            return particle;

        }
        protected getParticle(): Display3DParticle {
            return null;
        }
    }
}
module Pan3d {
    export class SkillKey {
        public time: number = 0;
        public particle: CombineParticle;
        public removeCallFun: Function;
        public scene3D:Scene3D;
        constructor(value:Scene3D ) {
            this.scene3D=value;
        }

        public addToRender(): void {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true

           this.scene3D. particleManager .addParticle(this.particle);
        }



        public setInfo(obj: SkillKeyVo): void {
            this.time = obj.frame * Scene3D.frameTime;

            this.particle =  this.scene3D. particleManager .getParticleByte(this.scene3D.fileRoot + obj.url);


        }

        public reset(): void {
            //this.time = 0;
            this.particle.reset();
            this.scene3D. particleManager .removeParticle(this.particle);
        }

        public destory(): void {
            // this.particle.destory();
            this.particle = null;
            this.removeCallFun = null;
        }

    }


}
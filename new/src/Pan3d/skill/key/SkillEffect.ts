module Pan3d {
    export class SkillEffect extends SkillKey {
        public active: Object3D;

        public addToRender(): void {
            super.addToRender();
            this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        }

        protected onPlayCom(event: Event = null): void {
            this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            this.scene3D.particleManager.removeParticle(this.particle);
            this.removeCallFun(this);
        }


    }
}